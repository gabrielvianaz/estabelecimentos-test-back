import { Sequelize } from 'sequelize';
import connection from '../database/database.js';
import Usuario from './Usuario.js';

const Estabelecimento = connection.define(
  'estabelecimentos',
  {
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipo: {
      type: Sequelize.STRING(1),
      allowNull: false,
    },
    cep: {
      type: Sequelize.STRING(8),
      allowNull: false,
    },
    logradouro: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numero: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bairro: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cidade: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {}
);

Estabelecimento.belongsTo(Usuario, {
  foreignKey: {
    allowNull: false,
  },
});

Usuario.hasMany(Estabelecimento, {
  foreignKey: 'usuarioId',
});

Estabelecimento.sync({ force: false });

export default Estabelecimento;
