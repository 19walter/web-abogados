const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Record = sequelize.define('Record', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  client_name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  case_type: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  assigned_to: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  case_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'records',
  timestamps: false
});

module.exports = Record;