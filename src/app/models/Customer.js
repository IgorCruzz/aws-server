import Sequelize, { Model } from 'sequelize';

class Customers extends Model {
    static init(sequelize) {
        super.init(
            {
                codigo: Sequelize.STRING,
                datacenter: Sequelize.STRING,
                porta_gg: Sequelize.INTEGER,
                porta_http: Sequelize.INTEGER,
                inadimplente: Sequelize.BOOLEAN,
                inadimplente_liberado: Sequelize.BOOLEAN,
                inadimplente_liberado_at: Sequelize.DATE,
            },
            { sequelize }
        );
        return this;
    }
}

export default Customers;
