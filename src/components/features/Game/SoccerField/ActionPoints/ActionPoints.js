import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import clsx from 'clsx';

import
{ getBallPosition,
  setBallPositionData,
  getEdgeState,
  setEdgeState } from '../../../../../redux/fieldSizeAndBallPositionRedux';
import {getGameMoves, setGameMovesData} from '../../../../../redux/gameMovesRedux';
import {getPlayerOne,
  getPlayerTurn,
  getPlayerTwo,
  setPlayerOneMoves,
  setPlayerTwoMoves,
  setPlayerTurn,
  playerOneScore,
  setPlayerTwoScore} from '../../../../../redux/playersRedux';
import {setAwsCurrentMove, setAwsDataHistory} from '../../../../../redux/awsDataRedux';

import styles from './ActionPoints.module.scss';

import {GameContext} from '../../../../../ContextAPI/GameContext';

const ActionPoints = ({ columns, maxRow }) => {
  const {newRoundFunc} = useContext(GameContext);
  const dispatch = useDispatch();

  const [playerOneGoal, setplayerOneGoal] = useState(false);
  const [playerTwoGoal, setPlayerTwoGoal] = useState(false);

  const ballPosition = useSelector(getBallPosition);
  const gameMoves = useSelector(getGameMoves);
  const edge = useSelector(getEdgeState);
  const playerOne = useSelector(getPlayerOne);
  const playerTwo = useSelector(getPlayerTwo);
  const playerTurn = useSelector(getPlayerTurn);

  const setBallPosition = ballPosition => {
    dispatch(setBallPositionData(ballPosition));
  };

  const scoreGoal = positionCoordinates => {
    if(playerTurn === playerOne.Name && positionCoordinates[0] === 0 && positionCoordinates[1] === (columns.length - 1)/2) {
      setplayerOneGoal(true);
    } else if(playerTurn === playerTwo.Name && positionCoordinates[0] === (maxRow) && positionCoordinates[1] === (columns.length - 1)/2) {
      setPlayerTwoGoal(true);
    }
  };

  useEffect(() => {
    if(playerOneGoal) {
      dispatch(playerOneScore());
      newRoundFunc();
      setplayerOneGoal(false);
    }
    if(playerTwoGoal) {
      dispatch(setPlayerTwoScore());
      newRoundFunc();
      setPlayerTwoGoal(false);
    }
  }, [dispatch, newRoundFunc, playerOneGoal, playerTwoGoal]);

  const determineBallPosition = (actionPoint) => {
    if(ballPosition[0] === actionPoint[0]
      && ballPosition[1] === actionPoint[1]) {
      return true;
    }
    return false;
  };

  const translateToCurrentMove = positionCoordinates => {
    if(positionCoordinates[0] < ballPosition[0] && positionCoordinates[1] === ballPosition[1]) return '1';
    if(positionCoordinates[0] > ballPosition[0] && positionCoordinates[1] === ballPosition[1]) return '16';
    if(positionCoordinates[0] === ballPosition[0] && positionCoordinates[1] < ballPosition[1]) return '64';
    if(positionCoordinates[0] === ballPosition[0] && positionCoordinates[1] > ballPosition[1]) return '4';
    if(positionCoordinates[0] < ballPosition[0] && positionCoordinates[1] < ballPosition[1]) return '128';
    if(positionCoordinates[0] < ballPosition[0] && positionCoordinates[1] > ballPosition[1]) return '2';
    if(positionCoordinates[0] > ballPosition[0] && positionCoordinates[1] < ballPosition[1]) return '32';
    if(positionCoordinates[0] > ballPosition[0] && positionCoordinates[1] > ballPosition[1]) return '8';
  };

  const setMovesForGamesAndPlayers = positionCoordinates => {
    dispatch(setGameMovesData([ballPosition, positionCoordinates]));
    if(playerTurn === playerOne.Name) {
      (!checkIfPlayerMoveContainsPosition(positionCoordinates) && !checkIfBallPositionOnEdge(positionCoordinates))
      && dispatch(setPlayerTurn(playerTwo.Name));
      dispatch(setPlayerOneMoves([ballPosition, positionCoordinates]));
      dispatch(setAwsCurrentMove(translateToCurrentMove(positionCoordinates)));
    } else {
      dispatch(setAwsDataHistory());
      (!checkIfPlayerMoveContainsPosition(positionCoordinates) && !checkIfBallPositionOnEdge(positionCoordinates))
      && dispatch(setPlayerTurn(playerOne.Name));
      dispatch(setPlayerTwoMoves([ballPosition, positionCoordinates]));
    }
  };

  const checkIfPlayerMoveContainsPosition = positionCoordinates => (
    playerOne.Moves.filter(move => move[0] === positionCoordinates || move[1] === positionCoordinates).length > 0
    || playerTwo.Moves.filter(move => move[0] === positionCoordinates || move[1] === positionCoordinates).length > 0
  );

  const checkIfBallPositionOnTop = positionCoordinates => (positionCoordinates[0] === 0);
  const checkIfBallPositionOnLeft = positionCoordinates => (positionCoordinates[1] === 0);
  const checkIfBallPositionOnRight = positionCoordinates => (positionCoordinates[1] === columns.length - 1);
  const checkIfBallPositionOnBottom = positionCoordinates => (positionCoordinates[0] === maxRow);

  const checkIfBallPositionOnEdge = positionCoordinates => (
    checkIfBallPositionOnTop(positionCoordinates)
    || checkIfBallPositionOnLeft(positionCoordinates)
    || checkIfBallPositionOnRight(positionCoordinates)
    || checkIfBallPositionOnBottom(positionCoordinates)
  );

  const setEdgeBasedOnTheBallPosition = positionCoordinates => {
    if(checkIfBallPositionOnTop(positionCoordinates)) {
      dispatch(setEdgeState('Top'));
    } else if(checkIfBallPositionOnLeft(positionCoordinates)) {
      dispatch(setEdgeState('Left'));
    } else if(checkIfBallPositionOnRight(positionCoordinates)) {
      dispatch(setEdgeState('Right'));
    } else if(checkIfBallPositionOnBottom(positionCoordinates)) {
      dispatch(setEdgeState('Bottom'));
    } else {
      dispatch(setEdgeState('none'));
    }

  };

  const setBallPositionHelper = positionCoordinates => {
    switch (edge) {
      case 'Top':
        if(positionCoordinates[0] === 1) {
          setBallPosition(positionCoordinates);
          setMovesForGamesAndPlayers(positionCoordinates);
        }
        break;
      case 'Left':
        if(positionCoordinates[1] === 1) {
          setBallPosition(positionCoordinates);
          setMovesForGamesAndPlayers(positionCoordinates);
        }
        break;
      case 'Right':
        if(positionCoordinates[1] === columns.length - 2) {
          setBallPosition(positionCoordinates);
          setMovesForGamesAndPlayers(positionCoordinates);
        }
        break;
      case 'Bottom':
        if(positionCoordinates[0] === maxRow - 1) {
          setBallPosition(positionCoordinates);
          setMovesForGamesAndPlayers(positionCoordinates);
        }
        break;
      default:
        setBallPosition(positionCoordinates);
        setMovesForGamesAndPlayers(positionCoordinates);
    }
  };

  const ballPositionSetter = positionCoordinates => {
    if((positionCoordinates[0] >= ballPosition[0] - 1
        && positionCoordinates[0] <= ballPosition[0] + 1)
      && (positionCoordinates[1] >= ballPosition[1] - 1
        && positionCoordinates[1] <= ballPosition[1] + 1)
      && !ballPositionInGameMovesArray(positionCoordinates)) {
      setEdgeBasedOnTheBallPosition(positionCoordinates);
      setBallPositionHelper(positionCoordinates);
      scoreGoal(positionCoordinates);
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
  maxRow: PropTypes.number,
};

export default ActionPoints;
