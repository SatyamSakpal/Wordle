import React, { useContext } from "react"
import GuessTile from "./GuessTile"
import { WordContext } from "../contexts/wordContext"
import { result } from "../types/resultType"
import { keyboard } from "../types/keyboardType"

// Enum to represent the colors for correct, in-word, and incorrect guesses
const enum Color {
    green = 'correct-pos',
    yellow = 'inword',
    gray = 'not-inword'
}

// Define prop types for the GuessRow component
type GuessRowProps = {
    word: string[], 
    currResult: result|undefined
}

// Utility function that sets the key color in the keyboard reference based on guess result
const setKeyColor = (keys: React.MutableRefObject<keyboard>, color: string, char: string) => {
    // Iterate through each key in the keyboard and update its color if the character matches
    keys.current.map((keyRow, rowIdx) => {
        keyRow.map((keyObj,keyIdx) => {
            if(keyObj.char.toLowerCase() === char)
                keys.current[rowIdx][keyIdx].color = color
        })
    })
}

// Define the GuessRow component using React Functional Component
const GuessRow: React.FC<GuessRowProps> = ({word, currResult}) => {
    // Access the WordContext for shared state (keyboard keys and max guess length)
    const context = useContext(WordContext)

    // Error handling: Ensure context is available; otherwise, throw an error
    if(!context) 
        throw Error('context error')

    // Destructure key adn MAX_GUESS_LENGTH from the context
    const {keys, MAX_GUESS_LENGTH} = context 
    
    // Function to get the color for a specific character based on the guess result
    const getColor = (i: number): string => {
        if(!currResult)  return '' // If no result, return empty string (no color)

        // If the character is in the correct position
        if(currResult.wordDetail?.[i].isPosCorrect|| currResult.isGuessed){
            setKeyColor(keys,Color.green,word[i]) // Set key color to green for correct position
            return Color.green
        }

        // If the character is in the word but not in the correct position
        if(currResult.wordDetail?.[i].inWord){
            setKeyColor(keys,Color.yellow,word[i]) // Set key color to yellow for in-word but incorrect position
            return Color.yellow
        }

        // If the character is not in the word
        setKeyColor(keys,Color.gray,word[i]) // Set key color to gray for incorrect letter
        return Color.gray
    }
    
    const tiles: JSX.Element[] = []

    // Utility function that creates tiles for each character in the guess box.
    const createTiles = ():JSX.Element[] => {
        // Loop through each character in the word and create corresponding GuessTile components
        for(let i=0; i<MAX_GUESS_LENGTH; i++) {
            // If a character is present, create a GuessTile with the appropriate color and character
            if(word[i]) {
                tiles.push(<GuessTile key={i} char={word[i]} color={getColor(i)} />)
            }
            else {
                // If no character is present, create an empty GuessTile
                tiles.push(<GuessTile key={i} char={''} color={''}/>)
            }
        }
        return tiles
    }
    
    
    return (
        // Render the guess row and apply the 'correct-row' class if the word is guessed correctly
        <div className={`guess-row ${currResult?.isGuessed?'correct-row':''}`} >
            {createTiles()} {/* Render the created tiles for the guess box */}
        </div>
    )
}

export default GuessRow