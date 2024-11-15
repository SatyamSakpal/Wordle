import todaysWord from "./todaysWord";
import parseWord from "./parseWord";

type response = {
    currWord: string;
    isGuessed: boolean;
    wordDetail?: object[]
}

const checkWord = (word: string): response => {

    let response: response = {  
        currWord: word,
        isGuessed: false,
    }
    
    if(todaysWord === word) {
        response.isGuessed = true
        return response
    }

    response.wordDetail = parseWord(word)

    return response

}
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

export default checkWord