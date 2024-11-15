import GuessRow from "./GuessRow";
import React, { useContext } from "react";
import { WordContext } from "../contexts/wordContext";

// Define prop types for the GuessBox component
type GuessBoxProps = {
    gussedWord: string[][]
}


// Define the GuessBox component using React Functional Component
const GuessBox: React.FC<GuessBoxProps> = ({gussedWord}) => {
    // Access the WordContext for shared state (results data)
    const context = useContext(WordContext)

    // Error handling: Ensure context is available; otherwise, throw an error
    if(!context) 
        throw Error('context error')

    // Destructure result from the context
    const {result} = context

    return (
        // Wrapper div for the guess box container
        <div className="guess-box">
            {/* Map over the gussedWord array and render a GuessRow for each word */}
            {
                gussedWord.map((word, idx) => (
                    <GuessRow 
                        key={idx} 
                        word={word} 
                        currResult={result?result[idx]:undefined}
                    />
                ))
            }
        </div>
    )
}

export default GuessBox