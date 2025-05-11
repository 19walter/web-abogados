const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const DetallesAbogados = sequelize.define('DetallesAbogados', {
  abogado_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  especialidad: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  codigo_colegiatura: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: 'detalles_abogados',
  timestamps: false
});

module.exports = DetallesAbogados; 