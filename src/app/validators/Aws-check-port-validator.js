import * as Yup from 'yup';

export default async (req, res, next) => {
    try {
        const Schema = Yup.object().shape({
            port: Yup.number().required(),
            ip: Yup.string().required(),
        });

        await Schema.validate(req.headers, { abortEarly: false });

        return next();
    } catch (e) {
        return res.status(400).json({
            error: 'Erro na validação',
            messages: e.errors,
        });
    }
};
