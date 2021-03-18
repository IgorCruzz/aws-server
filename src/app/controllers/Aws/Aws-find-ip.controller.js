import * as Sentry from '@sentry/node';

import AwsRepository from '../../repositories/Aws.repository';

class AwsFindIpController {
    async handle(httpRequest) {
        Sentry.init({
            dsn:
                'https://693ffcfa7d944c5dbc4416f64283095c@o529903.ingest.sentry.io/5658191',

            tracesSampleRate: 1.0,
        });
        const transaction = Sentry.startTransaction({
            op: 'transaction',
            name: 'AwsFindIpController',
        });

        Sentry.configureScope((scope) => {
            scope.setSpan(transaction);
        });
        try {
            const { codigo } = httpRequest;

            const customer = await AwsRepository.findByCodigo(codigo);

            if (!customer) {
                return {
                    status: 400,
                    body: {
                        message: 'Cliente não encontrado',
                    },
                };
            }

            if (customer.datacenter !== 'Aws') {
                return {
                    status: 400,
                    body: {
                        message: 'Cliente não esta hospedado na Aws',
                    },
                };
            }

            const findServers = await AwsRepository.findServers(codigo);

            if (!findServers.Reservations[0]) {
                return {
                    status: 400,

                    body: {
                        message: 'Servidor não encontrado',
                    },
                };
            }

            const listServers = [];

            findServers.Reservations.map((instance) => {
                instance.Instances.map((instance) => {
                    listServers.push({
                        Server: instance.Tags,
                        PublicIpAddress: instance.PublicIpAddress,
                    });
                    return true;
                });
                return true;
            });

            const servers = [];

            function findServer(instance) {
                const { PublicIpAddress } = instance;
                instance.Server.map((server) => {
                    if (
                        server.Key === 'Name' &&
                        server.Value.includes('CLI-') &&
                        server.Value.includes('-AP') &&
                        !server.Value.includes('-BKP')
                    ) {
                        if (
                            server.Value.includes('-AP01') ||
                            server.Value.includes('-AP02') ||
                            server.Value.includes('-AP03') ||
                            server.Value.includes('-AP04')
                        ) {
                            servers.push({
                                Name: server.Value,
                                PublicIpAddress,
                            });
                        }
                    }
                });
            }

            if (listServers.length >= 2) {
                listServers.filter(findServer);
            } else {
                const serverName = listServers[0].Server.find((key) => {
                    if (key.Key === 'Name') {
                        return key.Value;
                    }
                });

                servers.push({
                    Name: serverName.Value,
                    PublicIpAddress: listServers[0].PublicIpAddress,
                });
            }

            if (!servers[0].PublicIpAddress) {
                return {
                    status: 400,

                    body: {
                        message: 'Nenhum ip foi localizado',
                    },
                };
            }

            return {
                status: 200,

                body: {
                    message: 'Consulta realizada com sucesso',
                    instances: servers,
                },
            };
        } catch (error) {
            Sentry.captureException(error);
            return {
                status: 500,
                body: error,
            };
        } finally {
            transaction.finish();
        }
    }
}

export default new AwsFindIpController();
