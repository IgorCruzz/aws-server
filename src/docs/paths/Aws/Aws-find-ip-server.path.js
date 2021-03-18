const findIpServer = {
    get: {
        tags: ['Aws'],
        summary: 'API para consultar o ip dos servidores de aplicação.',
        parameters: [],
        responses: {
            200: {
                description: 'Sucesso',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/schemas/findIPServerResult',
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

export default findIpServer;
