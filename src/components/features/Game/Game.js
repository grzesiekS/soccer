import React from 'react';

import styles from './Game.module.scss';
import SoccerField from './SoccerField/SoccerField';

const soccerFieldSize = [7, 9];

const Game = () => (
  <div className={styles.container}>
    <SoccerField fieldSize={soccerFieldSize} />
  </div>
);

export default Game;
