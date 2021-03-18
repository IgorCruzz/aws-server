const unauthorized = {
    description: 'Credenciais inválidas',
    content: {
        'application/json': {
            schema: {
                $ref: '#/schemas/error',
            },
        },
    },
};

export default unauthorized;
