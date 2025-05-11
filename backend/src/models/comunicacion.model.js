const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Comunicacion = sequelize.define('Comunicacion', {
  comunicacion_id: {
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
  asistente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo_cita: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'comunicacion',
  timestamps: false
});

module.exports = Comunicacion; 