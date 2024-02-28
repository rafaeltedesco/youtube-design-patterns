"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GameController_1 = __importDefault(require("./controller/GameController"));
const GameService_1 = __importDefault(require("./services/GameService"));
const GameRepository_1 = __importDefault(require("./repositories/GameRepository"));
const app = (0, express_1.default)();
const gameRepository = new GameRepository_1.default();
const gameService = new GameService_1.default(gameRepository);
const gameController = new GameController_1.default(gameService);
app.use((req, res, next) => {
    console.log(req.method, req.url, new Date());
    return next();
    ;
});
app.get('/games', (req, res) => gameController.get(req, res));
app.listen(3333, () => console.log(`Server up and running on Port 3333`));
