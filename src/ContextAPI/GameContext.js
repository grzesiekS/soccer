import React, {useState, createContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import { getSoccerFieldSize, setBallPositionData, setEdgeState } from '../redux/fieldSizeAndBallPositionRedux';
import { resetGameMovesData } from '../redux/gameMovesRedux';

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
  const [playerOne, setPlayerOne] = useState(playerOneData);
  const [playerTwo, setPlayerTwo] = useState(playerTwoData);
  const [playerTurn, setPlayerTurn] = useState(playerOne.Name);

  const newGame = event => {
    event.preventDefault();
    dispatch(setBallPositionData([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]));
    dispatch(resetGameMovesData());
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
    dispatch(setEdgeState('none'));
  };

  const newRound = () => {
    dispatch(setBallPositionData([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]));
    dispatch(resetGameMovesData());
    setPlayerTurn(playerOne.Name);
    setPlayerOne(prevData => ({
      ...prevData,
      Moves: [],
    }));
    setPlayerTwo(prevData => ({
      ...prevData,
      Moves: [],
    }));
    dispatch(setEdgeState('none'));
  };


  const value = {
    playerOneContext: [playerOne, setPlayerOne],
    playerTwoContext: [playerTwo, setPlayerTwo],
    playerTurnContext: [playerTurn, setPlayerTurn],
    newGameFunc: event => newGame(event),
    newRoundFunc: () => newRound(),
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
