import * as Sentry from '@sentry/node';

import AwsRepository from '../../repositories/Aws.repository';

class AwsStartController {
    async handle(httpRequest) {
        Sentry.init({
            dsn:
                'https://693ffcfa7d944c5dbc4416f64283095c@o529903.ingest.sentry.io/5658191',

            tracesSampleRate: 1.0,
        });
        const transaction = Sentry.startTransaction({
            op: 'transaction',
            name: 'AwsStartController',
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

            const instances = findServers.Reservations.map(
                (instance) => instance.Instances[0].InstanceId
            );

            const instancesIds = {
                InstanceIds: instances,
            };

            const startServers = await AwsRepository.startServers(instancesIds);

            if (!startServers.StartingInstances[0]) {
                return {
                    status: 400,

                    body: {
                        message: 'Ocorreu um erro ao inciar o servidor',
                    },
                };
            }

            return {
                status: 200,

                body: {
                    message: 'Iniciado o start dos servidores',
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

export default new AwsStartController();
