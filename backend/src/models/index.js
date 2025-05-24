const sequelize = require('../config/db.config');
const Usuario = require('./user.model');
const DetallesAbogados = require('./detalles_abogados.model');
const Cliente = require('./clientes.model');
const Caso = require('./casos.model');
const Documento = require('./documentos.model');
const Respuesta = require('./respuestas.model');
const Comunicacion = require('./comunicacion.model');
const Cita = require('./citas.model');
const Especialidad = require('./especialidades.model');
const Archivo = require('./archivos.model');

// Definir la tabla intermedia para la relación N:M
const AbogadoEspecialidad = sequelize.define('AbogadoEspecialidad', {}, { 
  tableName: 'abogado_especialidad', 
  timestamps: false 
});

// Relaciones
// Usuario - DetallesAbogados (1:1)
Usuario.hasOne(DetallesAbogados, { foreignKey: 'abogado_id' });
DetallesAbogados.belongsTo(Usuario, { foreignKey: 'abogado_id' });

// Cliente - Caso (1:N)
Cliente.hasMany(Caso, { foreignKey: 'cliente_id' });
Caso.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Usuario (abogado) - Caso (1:N)
Usuario.hasMany(Caso, { foreignKey: 'abogado_id' });
Caso.belongsTo(Usuario, { foreignKey: 'abogado_id' });

// Caso - Documento (1:N)
Caso.hasMany(Documento, { foreignKey: 'caso_id' });
Documento.belongsTo(Caso, { foreignKey: 'caso_id' });

// Caso - Respuesta (1:N)
Caso.hasMany(Respuesta, { foreignKey: 'caso_id' });
Respuesta.belongsTo(Caso, { foreignKey: 'caso_id' });

// Usuario (abogado) - Respuesta (1:N)
Usuario.hasMany(Respuesta, { foreignKey: 'abogado_id' });
Respuesta.belongsTo(Usuario, { foreignKey: 'abogado_id' });

// Caso - Comunicacion (1:N)
Caso.hasMany(Comunicacion, { foreignKey: 'caso_id' });
Comunicacion.belongsTo(Caso, { foreignKey: 'caso_id' });

// Usuario (abogado) - Comunicacion (1:N)
Usuario.hasMany(Comunicacion, { foreignKey: 'abogado_id' });
Comunicacion.belongsTo(Usuario, { foreignKey: 'abogado_id' });

// Usuario (asistente) - Comunicacion (1:N)
Usuario.hasMany(Comunicacion, { foreignKey: 'asistente_id' });
Comunicacion.belongsTo(Usuario, { foreignKey: 'asistente_id', as: 'Asistente' });

// Comunicacion - Cita (1:N)
Comunicacion.hasMany(Cita, { foreignKey: 'comunicacion_id' });
Cita.belongsTo(Comunicacion, { foreignKey: 'comunicacion_id' });

// Relaciones para Cita profesional
Cita.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Cita.belongsTo(Usuario, { foreignKey: 'abogado_id', as: 'Abogado' });
Cita.belongsTo(Usuario, { foreignKey: 'asistente_id', as: 'Asistente' });
Cita.belongsTo(Caso, { foreignKey: 'caso_id' });

// Relación N:M entre Usuario (abogado) y Especialidad
Usuario.belongsToMany(Especialidad, { through: AbogadoEspecialidad, foreignKey: 'abogado_id', otherKey: 'especialidad_id', as: 'especialidads' });
Especialidad.belongsToMany(Usuario, { through: AbogadoEspecialidad, foreignKey: 'especialidad_id', otherKey: 'abogado_id' });

// Caso - Archivo (1:N)
Caso.hasMany(Archivo, { foreignKey: 'caso_id' });
Archivo.belongsTo(Caso, { foreignKey: 'caso_id' });

module.exports = {
  Usuario,
  DetallesAbogados,
  Cliente,
  Caso,
  Documento,
  Respuesta,
  Comunicacion,
  Cita,
  Especialidad,
  AbogadoEspecialidad,
  Archivo
}; 