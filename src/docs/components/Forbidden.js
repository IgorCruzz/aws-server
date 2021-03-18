const forbidden = {
    description: 'Acesso negado',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/error',
            },
        },
    },
};

export default forbidden;
