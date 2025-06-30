import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; 
import { validateTarjetaNoVencida } from '../utils/validators.js';
import { maskCardNumber } from '../utils/maskUtils.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    notEmpty: true
    }
  },
  dni: {                                        
    type: DataTypes.STRING(8),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,         // Rechaza string vacio
      is: /^[0-9]{7,8}$/      // Accepts only numbers, 7 to 8 digits
    }
  },
  tarjetaNro: {
    type: DataTypes.STRING(16),
    allowNull: false,
    validate: {
      notEmpty: true,
      is: /^[0-9]{16}$/                         // Accepts only digits
    }
  },
  tarjetaMA: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,      
      isNotExpired: validateTarjetaNoVencida    // Llamada a función validadora
    },
    comment: "Mes/Año de vencimiento"
  },
  codigoPostal: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    notEmpty: true
    }
  }
}, 
{
  tableName: 'clientes',                        // Options
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

Cliente.prototype.toJSON = function () {        // Custom .toJSON() to mask sensitive info
  const values = { ...this.get() };

  if (values.tarjetaNro) {
    values.tarjetaNro = maskCardNumber(values.tarjetaNro);
  }

  return values;
};

export default Cliente;