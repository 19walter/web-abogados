const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Cliente = sequelize.define('Cliente', {
  cliente_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_apellido: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'clientes',
  timestamps: false
});

module.exports = Cliente; 