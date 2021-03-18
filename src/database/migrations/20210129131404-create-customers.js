module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('customers', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            codigo: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            datacenter: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            porta_gg: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            porta_http: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 80,
            },
            inadimplente: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            inadimplente_liberado: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: null,
            },
            inadimplente_liberado_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        }),

    down: (queryInterface) => queryInterface.dropTable('customers'),
};
