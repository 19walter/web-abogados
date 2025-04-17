const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id_users: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creador: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'usuarios',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      if (user.contrasena) {
        user.contrasena = await bcrypt.hash(user.contrasena, 10);
      }
    }
  }
});

User.prototype.validarContrasena = async function(contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = User;