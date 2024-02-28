"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const connection = promise_1.default.createPool({
    user: (_a = process.env.DB_USER) !== null && _a !== void 0 ? _a : 'root',
    password: (_b = process.env.DB_PASSWORD) !== null && _b !== void 0 ? _b : 'root',
    host: (_c = process.env.DB_HOST) !== null && _c !== void 0 ? _c : 'localhost',
    port: (_d = Number(process.env.DB_PORT)) !== null && _d !== void 0 ? _d : 3306,
    database: (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : 'yt_proxy',
});
exports.default = connection;
