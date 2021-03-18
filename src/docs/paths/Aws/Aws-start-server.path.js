const startServer = {
    post: {
        tags: ['Aws'],
        summary: 'API para ligar um servidor de cliente na Aws.',
        requestBody: {},
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/startServerResult',
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

export default startServer;
