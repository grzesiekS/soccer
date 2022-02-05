import React, {useContext} from 'react';
import Player from './Player/Player';
import Score from './Score/Score';

import styles from './ScoreBoard.module.scss';

import {GameContext} from '../../../ContextAPI/GameContext';

const ScoreBoard = () => {
  const {playerOneContext, playerTwoContext} = useContext(GameContext);

  const [playerOne] = playerOneContext;
  const [playerTwo] = playerTwoContext;

  return(
    <div className={styles.container}>
      <div className={styles.playerSection}>
        <Player name={playerOne.Name}/>
        <Player name={playerTwo.Name}/>
      </div>
      <Score playerOneScore={playerOne.Score} playerTwoScore={playerTwo.Score}/>
    </div>
  );
};

export default ScoreBoard;
