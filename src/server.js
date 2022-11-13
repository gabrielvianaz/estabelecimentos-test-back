import app from './app.js';
import connection from './database/database.js';
import Usuario from './models/Usuario.js';
import Estabelecimento from './models/Estabelecimento.js';

connection
  .authenticate()
  .then(() => {})
  .catch((err) => console.log(err));

app.listen(process.env.PORT || 3000);
