import { Router } from 'express';
import UsuarioController from './controllers/UsuarioController.js';
import LoginController from './controllers/LoginController.js';
import TokenController from './controllers/TokenController.js';
import EstabelecimentoController from './controllers/EstabelecimentoController.js';
import AtivacaoController from './controllers/AtivacaoController.js';
import getIdByToken from './functions/getIdbyToken.js';

const routes = new Router();

routes.post('/usuario', UsuarioController.store);
routes.post('/login', LoginController.store);
routes.post('/estabelecimentos', getIdByToken, EstabelecimentoController.store);
routes.get('/estabelecimentos', getIdByToken, EstabelecimentoController.index);
routes.get(
  '/estabelecimentos/:id',
  getIdByToken,
  EstabelecimentoController.show
);
routes.put(
  '/estabelecimentos/:id',
  getIdByToken,
  EstabelecimentoController.update
);
routes.delete(
  '/estabelecimentos/:id',
  getIdByToken,
  EstabelecimentoController.delete
);
routes.post('/ativar/:token', AtivacaoController.store);
routes.post('/verificar', getIdByToken, TokenController.store);

export default routes;
