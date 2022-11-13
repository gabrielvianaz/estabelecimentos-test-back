import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import * as dotenv from 'dotenv';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    dotenv.config();
  }

  middlewares() {
    this.server.use(cors({}));
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
