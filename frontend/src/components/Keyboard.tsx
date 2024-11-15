import React, { useContext } from 'react';
import { WordContext } from '../contexts/wordContext';

// Define the prop types for the Keyboard component
type KeyboardProps = {
  onKeyPress: (key: string) => void; 
};

// Keyboard component definition using React Functional Component
const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress }) => {
  // Access the context that provides data for the keyboard (keys structure)
  const context = useContext(WordContext)

  // Error handling if the context is not available (prevents null/undefined issues)
  if(!context) 
    throw Error('context error')
  
  // Destructure the keys from the context for use in rendering the keyboard
  const {keys} = context

  return (
    // Wrapper div for the keyboard layout
    <div className="keyboard">
        {/* Map over each row of keys to create a row of buttons */}
        {keys.current.map((row, rowIndex) => (
            <div key={rowIndex} className="keyboard-row">
                {/* Map over each key in the row to create individual key buttons */}
                {row.map((key) => (
                    <button
                    key={key.char}
                    className={`keyboard-key ${key.char.toLowerCase()} ${key?.color}`}
                    onClick={() => onKeyPress(key.char)}
                    >
                        {/* Render the key character, and replace 'Backspace' with an SVG icon */}
                        {
                            key.char != 'Backspace'?
                            key.char.toUpperCase():
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="game-icon" data-testid="icon-backspace"><path fill="white" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg>
                        }
                    </button>
                ))}
            </div>
        ))}
    </div>
  );
};

export default Keyboard;
