const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('server-test', 'user', 'pass', {
    dialect: 'sqlite',
    host: './dev.sqlite'
});


module.exports = sequelize