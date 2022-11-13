import { Sequelize } from 'sequelize';
import connection from '../database/database.js';
import bcrypt from 'bcrypt';

const Usuario = connection.define(
  'usuarios',
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    confirmado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeSave: async (usuario) => {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      },
    },
  }
);

Usuario.sync({ force: false });

export default Usuario;
