const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  cliente: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('Consulta', 'Reunión', 'Seguimiento', 'Audiencia'),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Pendiente', 'Confirmada', 'Cancelada', 'Completada'),
    allowNull: false,
    defaultValue: 'Pendiente'
  },
  assigned_to: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'appointments',
  timestamps: false
});

module.exports = Appointment; 