import app from './app.js';
import connection from './database/database.js';
import Usuario from './models/Usuario.js';

connection
  .authenticate()
  .then(() => {})
  .catch((err) => console.log(err));

app.listen(8081);
