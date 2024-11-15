"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todaysWord_1 = __importDefault(require("./todaysWord"));
let parsedWord = [];
const parseLetter = (letter, idx) => {
    if (!todaysWord_1.default.includes(letter))
        return { letter, inWord: false, isPosCorrect: false };
    if (todaysWord_1.default[idx] != letter)
        return { letter, inWord: true, isPosCorrect: false };
    return { letter, inWord: true, isPosCorrect: true };
};
const parseWord = (word) => {
    parsedWord = [];
    const wordArr = Array.from(word);
    wordArr.map((letter, idx) => {
        let parsedLetter = parseLetter(letter, idx);
        parsedWord.push(parsedLetter);
    });
    return parsedWord;
};
exports.default = parseWord;
