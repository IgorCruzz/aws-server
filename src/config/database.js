require('dotenv').config();

const database = {
    db: {
        dialect: 'postgres',
        host: 'ec2-52-21-252-142.compute-1.amazonaws.com',
        username: 'axhieoxudqbbdk',
        password: '941e61a9c7933f7cd2f8f866b94737e5ff28b9fc2b174f075d91d988da7e337b',
        database: 'd6u45l4c7pksil',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
        dialectOptions: {
            encrypt: true,
        },
    },
    test: {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'test',
        logging: false,
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
        dialectOptions: {
            encrypt: true,
        },
    },
};

module.exports = process.env.NODE_ENV !== 'teste' ? database.db : database.test;
