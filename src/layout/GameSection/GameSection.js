import React from 'react';
import ScoreBoard from '../../components/features/ScoreBoard/ScoreBoard';

import styles from './GameSection.module.scss';

const GameSection = () => (
  <div className={styles.container}>
    <ScoreBoard />
  </div>
);

export default GameSection;
