const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Documento = sequelize.define('Documento', {
  documento_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  caso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  archivo: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  }
}, {
  tableName: 'documentos',
  timestamps: false
});

module.exports = Documento; 