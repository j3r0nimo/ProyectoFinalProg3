// src/models/ticketModel.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  compraId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'compras',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clientes',
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    validate: {
      isInt: true,
      notNull: { msg: 'clienteId es obligatorio' },
      min: 1
    }
  },  
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  precio: {
  type: DataTypes.FLOAT,
  allowNull: false,
  validate: {
    min: {
      args: [0.01],
      msg: 'El precio debe ser mayor a 0'
    },
    notNull: {
      msg: 'El precio es obligatorio'
    }
  }
},
  sector: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'tickets',
  timestamps: false
});

export default Ticket;
