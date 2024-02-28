import express from 'express';
import GameController from './controller/GameController';
import GameService from './services/GameService';
import GameRepository from './repositories/GameRepository';

const app = express();

const gameRepository = new GameRepository();
const gameService = new GameService(gameRepository);
const gameController = new GameController(gameService);

app.use((req, res, next) => {
  console.log(req.method, req.url, new Date());
  return next();
})

app.get('/games', (req, res) => gameController.get(req, res));

app.listen(3333, () => console.log(`Server up and running on Port 3333`));