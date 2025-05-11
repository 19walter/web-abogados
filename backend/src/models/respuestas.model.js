const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Respuesta = sequelize.define('Respuesta', {
  respuesta_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  caso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  abogado_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'respuestas',
  timestamps: false
});

module.exports = Respuesta; 