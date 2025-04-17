const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('User', {
  id_users: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  contrasena: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  creador: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_spanish_ci'
});

module.exports = User; 