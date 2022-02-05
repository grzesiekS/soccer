import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ActionPoints.module.scss';

import {GameContext} from '../../../../../ContextAPI/GameContext';

const ActionPoints = ({ columns }) => {
  const {ballPositionContext, gameMovesContext, playerTurnContext, playerOneContext, playerTwoContext} = useContext(GameContext);

  const [ballPosition, setBallPosition] = ballPositionContext;
  const [gameMoves, setGameMoves] = gameMovesContext;
  const [playerTurn, setPlayerTurn] = playerTurnContext;
  const [playerOne, setPlayerOne] = playerOneContext;
  const [playerTwo, setPlayerTwo] = playerTwoContext;


  const determineBallPosition = (actionPoint) => {
    if(ballPosition[0] === actionPoint[0]
      && ballPosition[1] === actionPoint[1]) {
      return true;
    }
    return false;
  };

  const setMovesForGamesAndPlayers = positionCoordinates => {
    setGameMoves(prevGameMoves => [...prevGameMoves, [ballPosition, positionCoordinates]]);
    if(playerTurn === playerOne.Name) {
      setPlayerTurn(playerTwo.Name);
      setPlayerTwo(prevData => (
        {
          ...prevData,
          Moves: [...prevData.Moves, [ballPosition, positionCoordinates]],
        }
      ));
    } else {
      setPlayerTurn(playerOne.Name);
      setPlayerOne(prevData => (
        {
          ...prevData,
          Moves: [...prevData.Moves, [ballPosition, positionCoordinates]],
        }
      ));
    }
  };

  const ballPositionSetter = positionCoordinates => {
    if((positionCoordinates[0] >= ballPosition[0] - 1
        && positionCoordinates[0] <= ballPosition[0] + 1)
      && (positionCoordinates[1] >= ballPosition[1] - 1
        && positionCoordinates[1] <= ballPosition[1] + 1)
      && !ballPositionInGameMovesArray(positionCoordinates)) {
      setBallPosition(positionCoordinates);
      setMovesForGamesAndPlayers(positionCoordinates);
    }
  };

  const ballPositionInGameMovesArray = positionCoordinates => {
    for (const move of gameMoves) {
      if((move[0][0] === ballPosition[0] && move[0][1] === ballPosition[1] && move[1][0] === positionCoordinates[0] && move[1][1] === positionCoordinates[1])
      || (move[1][0] === ballPosition[0] && move[1][1] === ballPosition[1] && move[0][0] === positionCoordinates[0] && move[0][1] === positionCoordinates[1])) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={styles.container}>
      {columns.map(column => (
        <div
          key={column}
          id={column}
          className={determineBallPosition(column)
            ? clsx(styles.point, styles.ball, `${column}`)
            : clsx(styles.point, `${column}`)}
          onClick={() => ballPositionSetter(column)}
        />
      ))}
    </div>
  );
};

ActionPoints.propTypes = {
  columns: PropTypes.array,
};

export default ActionPoints;
