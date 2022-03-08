import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import clsx from 'clsx';

import {getBallPosition, setBallPositionData} from '../../../../../redux/fieldSizeAndBallPositionRedux';

import styles from './ActionPoints.module.scss';

import {GameContext} from '../../../../../ContextAPI/GameContext';

const ActionPoints = ({ columns, maxRow }) => {
  const {gameMovesContext, playerTurnContext, playerOneContext, playerTwoContext, edgeContext, newRoundFunc} = useContext(GameContext);
  const dispatch = useDispatch();
  const ballPosition = useSelector(getBallPosition);

  const [gameMoves, setGameMoves] = gameMovesContext;
  const [playerTurn, setPlayerTurn] = playerTurnContext;
  const [playerOne, setPlayerOne] = playerOneContext;
  const [playerTwo, setPlayerTwo] = playerTwoContext;
  const [edge, setEdge] = edgeContext;

  const setBallPosition = ballPosition => {
    dispatch(setBallPositionData(ballPosition));
  };

  const scoreGoal = React.useCallback(() => {
    if(playerTurn === playerOne.Name && ballPosition[0] === 0 && ballPosition[1] === (columns.length - 1)/2) {
      setPlayerOne(prevData => ({
        ...prevData,
        Score: prevData.Score++,
      }));
      newRoundFunc();
    } else if(playerTurn === playerTwo.Name && ballPosition[0] === (maxRow) && ballPosition[1] === (columns.length - 1)/2) {
      setPlayerTwo(prevData => ({
        ...prevData,
        Score: prevData.Score++,
      }));
      newRoundFunc();
    }
  },[ballPosition, columns.length, maxRow, playerOne.Name, playerTurn, playerTwo.Name, setPlayerOne, setPlayerTwo, newRoundFunc]);

  useEffect(() => {
    scoreGoal();
  }, [ballPosition, scoreGoal]);

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
      (!checkIfPlayerMoveContainsPosition(playerOne.Moves, positionCoordinates) && !checkIfBallPositionOnEdge(positionCoordinates))
      && setPlayerTurn(playerTwo.Name);
      setPlayerOne(prevData => (
        {
          ...prevData,
          Moves: [...prevData.Moves, [ballPosition, positionCoordinates]],
        }
      ));
    } else {
      (!checkIfPlayerMoveContainsPosition(playerTwo.Moves, positionCoordinates) && !checkIfBallPositionOnEdge(positionCoordinates))
      && setPlayerTurn(playerOne.Name);
      setPlayerTwo(prevData => (
        {
          ...prevData,
          Moves: [...prevData.Moves, [ballPosition, positionCoordinates]],
        }
      ));
    }
  };

  const checkIfPlayerMoveContainsPosition = (playerMoves, positionCoordinates) => (
    playerMoves.filter(move => move[0] === positionCoordinates || move[1] === positionCoordinates).length > 0
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
      setEdge('Top');
    } else if(checkIfBallPositionOnLeft(positionCoordinates)) {
      setEdge('Left');
    } else if(checkIfBallPositionOnRight(positionCoordinates)) {
      setEdge('Right');
    } else if(checkIfBallPositionOnBottom(positionCoordinates)) {
      setEdge('Bottom');
    } else {
      setEdge('none');
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
