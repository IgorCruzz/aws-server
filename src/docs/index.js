import components from './Components';
import startServer from './paths/Aws/Aws-start-server.path';
import checkPort from './paths/Aws/Aws-check-port.path';
import findIp from './paths/Aws/Aws-find-ip-server.path';
import schemas from './Schemas';

export default {
    openapi: '3.0.0',
    info: {
        title: 'NUVEM',
        description: '',
        version: '1.0.0',
    },
    servers: [
        {
            url: '/',
        },
    ],
    license: {
        name: '',
        url: '',
    },
    tags: [
        {
            name: 'Aws',
        },
    ],
    paths: {
        '/start-server': startServer,
        '/check-port': checkPort,
        '/find-ip-server': findIp,
    },
    components,
    schemas,
};
