const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Cita = sequelize.define('Cita', {
  cita_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comunicacion_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  caso_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  abogado_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  asistente_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: true
  },
  lugar: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  motivo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'Pendiente'
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'citas',
  timestamps: false
});

module.exports = Cita; 