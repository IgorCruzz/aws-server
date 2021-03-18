import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database';

import Customer from '../app/models/Customer';

const models = [Customer];

class Database {
    constructor() {
        this.connection = new Sequelize(databaseConfig);
        this.init();
    }

    init() {
        models.map((model) => model.init(this.connection));
        models.map(
            (model) =>
                model.associate && model.associate(this.connection.models)
        );
    }
}

export default new Database();
