import { Sequelize } from 'sequelize';

const db = new Sequelize('sprint6', 'juan', '1234', {
	host: 'db',
	dialect: 'mysql'
});

export default db;
