import { createContext } from "react";
import { result } from "../types/resultType";
import { keyboard } from "../types/keyboardType";

// Defining the structure of the context's value
type wordContextType = {
    guessedWord: string[][]; // State to store the array of guessed words
    guess: number; // Tracks the current guess number (index)
    result: result[] | undefined; // Stores the results of each guess (optional, can be undefined initially)
    keys: React.MutableRefObject<keyboard>; // A reference to the keyboard layout, allowing mutation without re-rendering
    MAX_GUESSES: number; // The maximum number of guesses allowed
    MAX_GUESS_LENGTH: number // The maximum length of each guess
}

// Creating the WordContext with an initial value of 'undefined'
export const WordContext = createContext<wordContextType | undefined>(undefined)