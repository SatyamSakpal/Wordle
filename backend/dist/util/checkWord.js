"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todaysWord_1 = __importDefault(require("./todaysWord"));
const parseWord_1 = __importDefault(require("./parseWord"));
const checkWord = (word) => {
    let response = {
        currWord: word,
        isGuessed: false,
    };
    if (todaysWord_1.default === word) {
        response.isGuessed = true;
        return response;
    }
    response.wordDetail = (0, parseWord_1.default)(word);
    return response;
};
// Example of the response sent by the chekWord Function
// return {
//     currWord: 'salty',
//     isGuessed: false,
//     wordDetail: [
//         {letter: 's', inWord: true, isPosCorrect: true},
//         {letter: 'a', inWord: false, isPosCorrect: false},
//         {letter: 'l', inWord: false, isPosCorrect: false},
//         {letter: 't', inWord: false, isPosCorrect: false},
//         {letter: 'y', inWord: false, isPosCorrect: false}
//     ]
// }
exports.default = checkWord;
