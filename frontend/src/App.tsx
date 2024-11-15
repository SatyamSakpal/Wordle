import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import GuessBox from './components/GuessBox'
import { keyboard } from './types/keyboardType'
import { result } from './types/resultType'
import { WordContext } from './contexts/wordContext'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import Keyboard from './components/Keyboard'
import SoundEffect from './components/SoundEffect'


const MAX_GUESS_LENGTH = 5;
const MAX_GUESSES = 5;

const App: React.FC = () => {
    // State for tracking guessed words in a 2D array format, representing up to 5 guesses
    const [guessedWord, setGuessedWord] = useState<string[][]>([[],[],[],[],[]])

     // State for tracking the number of guesses made by the user
    const [guess, setGuess] = useState<number>(0)

    // State for storing the results returned by the server for each guess
    const [result, setResult] = useState<result[]>()

    // State indicating whether the user has guessed the word correctly
    const [won, setWon] = useState<boolean>(false)

    //State indicating the game status to play the sounds
    const [gameStatus, setGameStatus] = useState<'won' | 'lost' | 'none'>('none')
    
    // Keyboard layout reference for rendering the on-screen keyboard
    const keys = useRef<keyboard>([
        [{char:'Q'}, {char:'W'}, {char:'E'}, {char:'R'}, {char:'T'}, {char:'Y'}, {char:'U'}, {char:'I'}, {char:'O'}, {char:'P'}],
        [{char:'A'}, {char:'S'}, {char:'D'}, {char:'F'}, {char:'G'}, {char:'H'}, {char:'J'}, {char:'K'}, {char:'L'}],
        [{char:'Enter'}, {char:'Z'}, {char:'X'}, {char:'C'}, {char:'V'}, {char:'B'}, {char:'N'}, {char:'M'}, {char:'Backspace'}],
    ])

    useEffect(() => {
        if(won) return setGameStatus('won')
        if(!won && guess >= MAX_GUESSES) return setGameStatus('lost')
    }, [won, guess])

    // Custom hook to get the current window size for rendering the confetti effect
    const { width, height } = useWindowSize();
 
    // Function to update the result state with the server's response
    const updateResult = (wordResult: result) => {
        setResult((prevResult) => {
            if (!prevResult) return [wordResult];
            const updatedResult = [...prevResult];
            updatedResult[guess] = wordResult; 
            return updatedResult;
        })
    }

    // Function to add a character to the current guess
    const addCharToWord = (char: string) => {
        setGuessedWord((prevGuessedWord) => {
            const updatedWord = [...prevGuessedWord];
            updatedWord[guess] = [...updatedWord[guess], char]; 
            return updatedWord;
        })
    }

    // Function to delete the last character from the current guess
    const delCharFromWord = () => {
        setGuessedWord((prevGuessedWord) => {
            const updatedWord = [...prevGuessedWord];
            updatedWord[guess] = updatedWord[guess].slice(0, -1); 
            return updatedWord;
        })   
    }
    

    // Function to handle key presses from the physical keyboard
    const handleKeyPress = (e: KeyboardEvent) => {
        // Prevent actions if maximum guesses reached, duplicate keys pressed, or word already guessed
        if(guess >= MAX_GUESSES || guessedWord[guess].includes(e.key) || won) return

        // Handle 'Backspace' key press to delete a character
        if(e.key === 'Backspace') return  delCharFromWord()

        // Handle 'Enter' key press to submit the guess
        if(e.key === 'Enter'){
            if(guessedWord[guess].length != MAX_GUESS_LENGTH && guess < MAX_GUESSES) return     
            checkWord()
            return setGuess(prevGuess => prevGuess+= 1)
        }
        
        // Handle valid letter key presses and add to the current guess if under MAX_GUESS_LENGTHD characters
        if(/^[a-zA-Z]$/.test(e.key) && guessedWord[guess].length < MAX_GUESS_LENGTH) addCharToWord(e.key)
    }

    // Function to handle virtual keyboard key presses
    const handleVirKeyPress = (key: string) => {
        if(guess >= MAX_GUESSES || guessedWord[guess].includes(key.toLowerCase()) || won) return // Prevent actions if conditions met

        if(key === 'Backspace') return  delCharFromWord() // Handle 'Backspace' key press

        // Handle 'Enter' key press to submit the guess
        if(key === 'Enter'){
            if(guessedWord[guess].length != MAX_GUESS_LENGTH) return // Ensure the guess has MAX_GUESS_LENGTH characters
            checkWord() // Check the current guess with the server
            return setGuess(prevGuess => prevGuess+= 1) // Increment the guess count
        }
        
        // Handle valid letter key presses and add to the current guess if under MAND_GUESS_LENGTH characters
        if(/^[a-zA-Z]$/.test(key) && guessedWord[guess].length < MAX_GUESS_LENGTH) addCharToWord(key.toLowerCase())
    }

    // Function to check the current guess by sending it to the server
    const checkWord = async() => {
        try {
            const response = await fetch('http://localhost:5000/word/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ guessedWord: guessedWord[guess].join('') }), 
            })
            const wordResult: result = await response.json()
            
            if(wordResult.isGuessed) setWon(true) // Set 'won' state if the word is guessed correctly

            updateResult(wordResult) // Update the result state
        } catch (error) {
            console.log(error)
        }
    }
    
    // Add an event listener for physical keyboard presses when the component mounts
    useEffect(() => {
        window.addEventListener('keydown',handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    })

    return (
        // Provide context to child components
        <WordContext.Provider value={{guessedWord, guess, result, keys, MAX_GUESSES, MAX_GUESS_LENGTH}}>
             {/* Render confetti if the word is guessed correctly */}
            {won && <Confetti width={width} height={height} />}
            <Navbar/>
            <main>
                <GuessBox gussedWord = {guessedWord}/>
                <Keyboard onKeyPress={handleVirKeyPress}/>
            </main>
            <SoundEffect gameStatus={gameStatus}/>
        </WordContext.Provider>
    )
}

export default App
