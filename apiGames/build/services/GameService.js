"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceStatus_1 = require("./ServiceStatus");
const RedisService_1 = __importDefault(require("./RedisService"));
class GameService {
    constructor(gameRepository) {
        this.gameRepository = gameRepository;
        this.redisKey = 'games';
        this.redis = new RedisService_1.default();
    }
    getPaginated(page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield this.gameRepository.get(page, limit);
            const cached = yield this.redis.getData(this.redisKey);
            if (!cached) {
                return {
                    status: ServiceStatus_1.ServiceStatus.OK,
                    data: games,
                    page,
                    limit,
                };
            }
            const totalPages = this.getTotalPages(Number(cached), limit);
            if (page > totalPages || page <= 0)
                return { status: 'NOT_FOUND', data: {
                        error: {
                            message: 'Page Not Found',
                        }
                    } };
            const remainingPages = this.getRemainingPages(totalPages, page);
            return {
                status: ServiceStatus_1.ServiceStatus.OK,
                data: games,
                page,
                limit,
                totalPages,
                remainingPages
            };
        });
    }
    getTotalPages(gamesCount, limit) {
        return Math.ceil(gamesCount / limit);
    }
    getRemainingPages(totalPages, currentPage) {
        return totalPages - currentPage;
    }
}
exports.default = GameService;
