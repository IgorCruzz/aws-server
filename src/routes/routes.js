import { Router } from 'express';

import auth from '../app/middlewares/auth';

import AwsStartController from '../app/controllers/Aws/Aws-start.controller';
import AwsFindIpController from '../app/controllers/Aws/Aws-find-ip.controller';
import AwsCheckPortController from '../app/controllers/Aws/Aws-check-port.controller';

import AwsCheckPortValidation from '../app/validators/Aws-check-port-validator';

import adapRoute from '../express.adapter';



const routes = new Router();

routes.get('/check-api', (req, res) => res.status(200).json({ ok: true }));


routes.use(auth);

routes.post('/start-server', adapRoute(AwsStartController));
routes.get('/find-ip-server', adapRoute(AwsFindIpController));
routes.get(
    '/check-port',
    AwsCheckPortValidation,
    adapRoute(AwsCheckPortController)
);

export default routes;
