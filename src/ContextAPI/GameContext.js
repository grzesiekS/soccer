import React, {useState, createContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import { getSoccerFieldSize, setBallPositionData } from '../redux/fieldSizeAndBallPositionRedux';

export const GameContext = createContext();


export const GameProvider = ({ children }) => {
  const playerOneData = {
    Name: 'Player1',
    Moves: [],
    Score: 0,
  };

  const playerTwoData = {
    Name: 'Player2',
    Moves: [],
    Score: 0,
  };

  const dispatch = useDispatch();

  const soccerFieldSize = useSelector(getSoccerFieldSize);
  const [gameMoves, setGameMoves] = useState([]);
  const [playerOne, setPlayerOne] = useState(playerOneData);
  const [playerTwo, setPlayerTwo] = useState(playerTwoData);
  const [playerTurn, setPlayerTurn] = useState(playerOne.Name);
  const [edge, setEdge] = useState('none');

  const newGame = event => {
    event.preventDefault();
    dispatch(setBallPositionData([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]));
    setGameMoves([]);
    setPlayerTurn(playerOne.Name);
    setPlayerOne(prevData => ({
      ...prevData,
      Score: 0,
      Moves: [],
    }));
    setPlayerTwo(prevData => ({
      ...prevData,
      Score: 0,
      Moves: [],
    }));
    setEdge('none');
  };

  const newRound = () => {
    dispatch(setBallPositionData([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]));
    setGameMoves([]);
    setPlayerTurn(playerOne.Name);
    setPlayerOne(prevData => ({
      ...prevData,
      Moves: [],
    }));
    setPlayerTwo(prevData => ({
      ...prevData,
      Moves: [],
    }));
    setEdge('none');
  };


  const value = {
    soccerFieldSizeContext: [soccerFieldSize],
    gameMovesContext: [gameMoves, setGameMoves],
    playerOneContext: [playerOne, setPlayerOne],
    playerTwoContext: [playerTwo, setPlayerTwo],
    playerTurnContext: [playerTurn, setPlayerTurn],
    newGameFunc: event => newGame(event),
    newRoundFunc: () => newRound(),
    edgeContext: [edge, setEdge],
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node,
};
