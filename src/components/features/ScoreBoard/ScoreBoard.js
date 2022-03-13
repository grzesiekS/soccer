import React, {useContext} from 'react';
import { useSelector } from 'react-redux';
import Player from './Player/Player';
import Score from './Score/Score';
import Button from '../../common/Button/Button';

import {getPlayerOne, getPlayerTwo} from '../../../redux/playersRedux';

import styles from './ScoreBoard.module.scss';

import {GameContext} from '../../../ContextAPI/GameContext';

const ScoreBoard = () => {
  const {newGameFunc} = useContext(GameContext);

  const playerOne = useSelector(getPlayerOne);
  const playerTwo = useSelector(getPlayerTwo);

  return(
    <div className={styles.container}>
      <div className={styles.playerSection}>
        <Player name={playerOne.Name}/>
        <Player name={playerTwo.Name}/>
      </div>
      <Score playerOneScore={playerOne.Score} playerTwoScore={playerTwo.Score}/>
      <Button description='New Game' onClickFunction={e => newGameFunc(e)}/>
    </div>
  );
};

export default ScoreBoard;
