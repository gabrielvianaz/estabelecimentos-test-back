import Sequelize from 'sequelize';

const connection = new Sequelize('estabeledb', 'gabriel', '45095010a', {
  host: 'db4free.net',
  dialect: 'mysql',
});

export default connection;
