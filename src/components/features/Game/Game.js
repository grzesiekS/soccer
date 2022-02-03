import React from 'react';

import styles from './Game.module.scss';
import SoccerField from './SoccerField/SoccerField';

const Game = () => {
  return (
    <div className={styles.container}>
      <SoccerField />
    </div>
  );
};

export default Game;
