const startServerParamSchema = {
    type: 'object',
    properties: {
        codigo: {
            type: 'string',
        },
    },
    required: ['codigo'],
};

export default startServerParamSchema;
