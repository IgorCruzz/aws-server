const checkPort = {
    get: {
        tags: ['Aws'],
        summary: 'API para verificar se a porta 491 esta open.',
        parameters: [
            {
                in: 'header',
                name: 'port',
                required: true,
                schema: {
                    type: 'number',
                },
            },
            {
                in: 'header',
                name: 'ip',
                required: true,
                schema: {
                    type: 'string',
                },
            },
        ],
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/checkPortResult',
                        },
                    },
                },
            },
            401: {
                $ref: '#/components/unauthorized',
            },
            500: {
                $ref: '#/components/serverError',
            },
        },
    },
};

export default checkPort;
