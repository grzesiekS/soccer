import React from 'react';
import Game from '../../components/features/Game/Game';
import ScoreBoard from '../../components/features/ScoreBoard/ScoreBoard';

import styles from './GameSection.module.scss';

const GameSection = () => (
  <div className={styles.container}>
    <Game />
    <ScoreBoard />
  </div>
);

export default GameSection;
