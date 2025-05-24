const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Especialidad = sequelize.define('Especialidad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'especialidades',
  timestamps: false
});

module.exports = Especialidad; 