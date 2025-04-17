const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('jyang', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    authPlugins: {
      mysql_native_password: () => () => Buffer.from([0])
    }
  }
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

module.exports = sequelize;