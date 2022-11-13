import { Router } from 'express';
import UsuarioController from './controllers/UsuarioController.js';
import LoginController from './controllers/LoginController.js';

const routes = new Router();

routes.post('/usuario', UsuarioController.store);
routes.post('/login', LoginController.store);

export default routes;
