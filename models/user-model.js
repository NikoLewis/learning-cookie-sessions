const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

var User = sequelizeConnection.define('user', {
	username:{
		type: Sequelize.STRING,
		validate: {
			len: [1,50],

		}
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true,
			len: [1,50]
		}
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			len: [1,100]
		}
	}

})

User.sync();

module.exports = User