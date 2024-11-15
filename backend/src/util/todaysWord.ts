import words from '../data/words.json';

const todaysWord = (): string => {
    const today = new Date()
    let date = Number(`${today.getFullYear()}${today.getMonth()+1}${today.getDate()}`) //yyyymmdd
    const range = words.length; 
    const uniqueNumber = (date % range) + 1;

    // console.log(words[uniqueNumber])
    return words[uniqueNumber]
}

export default todaysWord()