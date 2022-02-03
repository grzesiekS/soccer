import React from 'react';
import Game from '../../components/features/Game/Game';
import ScoreBoard from '../../components/features/ScoreBoard/ScoreBoard';
import { GameProvider } from '../../ContextAPI/GameContext';

import styles from './GameSection.module.scss';

const GameSection = () => (
  <GameProvider>
    <div className={styles.container}>
      <Game />
      <ScoreBoard />
    </div>
  </GameProvider>
);

export default GameSection;
