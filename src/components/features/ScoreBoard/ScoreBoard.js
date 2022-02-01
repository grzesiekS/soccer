import React from 'react';
import Player from './Player/Player';
import Score from './Score/Score';

import styles from './ScoreBoard.module.scss';

const ScoreBoard = () => (
  <div className={styles.container}>
    <div className={styles.playerSection}>
      <Player name='Player1'/>
      <Player name='Player2'/>
    </div>
    <Score playerOneScore={3} playerTwoScore={4}/>
  </div>
);

export default ScoreBoard;
