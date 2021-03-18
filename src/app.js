import express, { json } from 'express';
import cors from 'cors';
import './database';
import { serve, setup } from 'swagger-ui-express';
import helmet from 'helmet';
import routes from './routes/routes';
import swagger from './docs';

const app = express();

app.use(json());
app.use(cors());
app.use(helmet());
app.use(
    '/api-docs',
    (req, res, next) => {
        res.set(
            'cache-control',
            'no-store, no-cache, must-revalidate, proxy-revalidate'
        );
        res.set('pragma', 'no-cache');
        res.set('expires', '0');
        res.set('surrogate-control', 'no-store');
        next();
    },
    serve,
    setup(swagger)
);
app.use(routes);
export default app;
