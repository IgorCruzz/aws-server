import AWS from 'aws-sdk';
import isPortReachable from 'is-port-reachable';

import Customer from '../models/Customer';

require('dotenv').config();

AWS.config.update({
    region: 'sa-east-1',
});
const ec2 = new AWS.EC2();

class AwsRepository {
    async findByCodigo(codigo) {
        const findCustomer = await Customer.findOne({
            where: { codigo },
        });

        return findCustomer;
    }

    async findServers(codigo) {
        const filterInfo = {
            Filters: [
                {
                    Name: 'tag:Name',
                    Values: [`*${codigo}*`],
                },
            ],
        };

        const response = await new Promise((resolve, reject) => {
            ec2.describeInstances(filterInfo, async (err, data) => {
                if (err) {
                    console.log('deu erro');
                    reject(err);
                }
                resolve(data);
            });
        });

        return response;
    }

    async startServers(instancesIds) {
        const response = await new Promise((resolve, reject) => {
            ec2.startInstances(instancesIds, async (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });

        return response;
    }

    async checkPort(port, ip) {
        const check = await isPortReachable(port, { host: ip });

        return check;
    }
}

export default new AwsRepository();
