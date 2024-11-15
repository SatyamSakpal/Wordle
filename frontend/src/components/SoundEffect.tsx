import React, { useEffect } from 'react';
import victorySound from '../sounds/victory.mp3'
import lostSound from '../sounds/loss.mp3'

type SoundEffectProps = {
  gameStatus: 'won' | 'lost' | 'none'; 
};

const SoundEffect: React.FC<SoundEffectProps> = ({ gameStatus }) => {
  useEffect(() => {
    const winAudio = new Audio(victorySound);  // Path to the win sound file
    const loseAudio = new Audio(lostSound);  // Path to the lose sound file

    // Play sound based on the game status
    if (gameStatus === 'won') {
      winAudio.play();
    } else if (gameStatus === 'lost') {
      loseAudio.play();
    }
  }, [gameStatus]);

  return null; // This component doesn't render anything visible
};

export default SoundEffect;