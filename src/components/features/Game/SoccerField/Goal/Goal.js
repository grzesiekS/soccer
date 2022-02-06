import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Goal.module.scss';

import {GameContext} from '../../../../../ContextAPI/GameContext';

const Goal = ({player, reversed = false }) => {
  const {soccerFieldSizeContext,
    ballPositionContext,
    playerTurnContext,
    playerOneContext,
    playerTwoContext,
    newRoundFunc} = useContext(GameContext);

  const [soccerFieldSize] = soccerFieldSizeContext;
  const [ballPosition] = ballPositionContext;
  const [playerTurn] = playerTurnContext;
  const [playerOne, setPlayerOne] = playerOneContext;
  const [playerTwo, setPlayerTwo] = playerTwoContext;

  const [goalFieldRange] = useState({
    playerOne: [
      [0, Math.round((soccerFieldSize[0] - 1)/2)],
      [0, Math.round((soccerFieldSize[0] - 1)/2) + 1],
      [0, Math.round((soccerFieldSize[0] - 1)/2) - 1],
    ],
    playerTwo: [
      [soccerFieldSize[1] - 1, Math.round((soccerFieldSize[0] - 1)/2)],
      [soccerFieldSize[1] - 1, Math.round((soccerFieldSize[0] - 1)/2) + 1],
      [soccerFieldSize[1] - 1, Math.round((soccerFieldSize[0] - 1)/2) - 1],
    ],
  });

  const ballPositionToScore = () => {
    let result = false;
    if(player === playerOne.Name) {
      for (const goalRange of goalFieldRange.playerTwo) {
        if(goalRange[0] === ballPosition[0] && goalRange[1] === ballPosition[1]) {
          result = true;
        }
      }
    } else {
      for (const goalRange of goalFieldRange.playerOne) {
        if(goalRange[0] === ballPosition[0] && goalRange[1] === ballPosition[1]) {
          result = true;
        }
      }
    }

    return result;
  };

  const scoreGoal = () => {
    if(ballPositionToScore() && player !== playerTurn) {
      playerTwo.Name === player
        ? setPlayerOne(prevData => ({
          ...prevData,
          Score: prevData.Score++,
        }))
        :
        setPlayerTwo(prevData => ({
          ...prevData,
          Score: prevData.Score++,
        }));
      newRoundFunc();
    }
  };

  return (
    <div className={reversed
      ? clsx(styles.container, styles.reversed)
      : clsx(styles.container, styles.normal)}
    >
      <p className={styles.playerName}>{player}</p>
      <div className={styles.goal} onClick={() => scoreGoal()}></div>
    </div>
  );
};

Goal.propTypes = {
  reversed: PropTypes.bool,
  player: PropTypes.string,
};

export default Goal;
