const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Caso = sequelize.define('Caso', {
  caso_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipo_caso: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  abogado_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'casos',
  timestamps: false
});

module.exports = Caso; 