import * as Sentry from '@sentry/node';

import AwsRepository from '../../repositories/Aws.repository';

class AwsCheckPortController {
    async handle(httpRequest) {
        Sentry.init({
            dsn:
                'https://693ffcfa7d944c5dbc4416f64283095c@o529903.ingest.sentry.io/5658191',

            tracesSampleRate: 1.0,
        });
        const transaction = Sentry.startTransaction({
            op: 'transaction',
            name: 'AwsCheckPortController',
        });

        Sentry.configureScope((scope) => {
            scope.setSpan(transaction);
        });
        try {
            const { port, ip } = httpRequest.headers;

            const check = await AwsRepository.checkPort(port, ip);

            if (!check) {
                return {
                    status: 400,

                    body: {
                        message: 'Porta não esta open',
                        portIsOpen: check,
                    },
                };
            }

            return {
                status: 200,

                body: {
                    message: 'Porta esta open',
                    portIsOpen: check,
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

export default new AwsCheckPortController();
