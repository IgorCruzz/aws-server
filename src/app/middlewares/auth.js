import jsonwebtoken from 'jsonwebtoken';

import { promisify } from 'util';

require('dotenv').config();

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Token não localizado',
        });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jsonwebtoken.verify)(
            token,
            process.env.TOKEN_SECRET
        );

        req.codigo = decoded.codigo;

        return next();
    } catch (err) {
        return res.status(401).json({
            error: 'Token inválido',
        });
    }
};
