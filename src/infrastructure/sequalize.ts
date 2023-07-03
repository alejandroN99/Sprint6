import { Sequelize } from 'sequelize';

const db = new Sequelize('db_sprint6', 'root', '4567', {
	host: 'localhost',
	dialect: 'mysql'
	//logging: false
});

export default db;
