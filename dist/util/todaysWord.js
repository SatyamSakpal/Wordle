"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const words_json_1 = __importDefault(require("../data/words.json"));
const todaysWord = () => {
    const today = new Date();
    let date = Number(`${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`); //yyyymmdd
    const range = words_json_1.default.length - 1;
    const uniqueNumber = (date % range) + 1;
    // console.log(words[uniqueNumber])
    return words_json_1.default[uniqueNumber];
};
exports.default = todaysWord();
