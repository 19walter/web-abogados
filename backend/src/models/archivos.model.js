const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Archivo = sequelize.define('Archivo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  caso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ruta: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fecha_subida: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'archivos',
  timestamps: false
});

module.exports = Archivo; 