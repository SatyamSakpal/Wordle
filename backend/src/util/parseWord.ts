import todaysWord from "./todaysWord";

type letterStat = {
    letter: string,
    inWord: boolean,
    isPosCorrect: boolean
}

let parsedWord: letterStat[] = []

const parseLetter = (letter: string, idx: number): letterStat => {
        if(!todaysWord.includes(letter)) 
            return {letter, inWord: false, isPosCorrect:false}
        
        if(todaysWord[idx] != letter) 
            return {letter, inWord: true, isPosCorrect:false}
        
        return {letter, inWord: true, isPosCorrect:true}
}

const parseWord = (word: string): letterStat[] => {
    parsedWord = []
    const wordArr = Array.from(word)
    wordArr.map((letter, idx) => {
        let parsedLetter = parseLetter(letter,idx)
        parsedWord.push(parsedLetter)
    })

    return parsedWord
}

export default parseWord