"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todaysWord_1 = __importDefault(require("./util/todaysWord"));
const checkWord_1 = __importDefault(require("./util/checkWord"));
const path = require('path');
const app = (0, express_1.default)();
require('dotenv').config();
app.use(express_1.default.json());
// console.log(checkWord('spice'))
const PORT = process.env.PORT || 3000;
app.use(express_1.default.static(path.join(__dirname, "../build")));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.post('/word/check/', (req, res) => {
    const currWord = req.body.guessedWord;
    res.json((0, checkWord_1.default)(currWord));
});
app.get('/word', (req, res) => {
    res.json(todaysWord_1.default);
});
app.listen(PORT, () => {
    console.log(`listening on Port: http://localhost:${PORT}`);
});
