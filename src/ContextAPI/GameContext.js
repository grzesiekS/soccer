import React, {createContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';

import { getSoccerFieldSize, setBallPositionData, setEdgeState } from '../redux/fieldSizeAndBallPositionRedux';
import { resetGameMovesData } from '../redux/gameMovesRedux';
import { getPlayerOne, resetPlayerOneMoves, setPlayerTurn, resetPlayerTwoMoves, resetPlayersData } from '../redux/playersRedux';
import { setAwsCurrentMove, resetAwsDataHistory } from '../redux/awsDataRedux';

export const GameContext = createContext();


export const GameProvider = ({ children }) => {
  const playerOne = useSelector(getPlayerOne);

  const dispatch = useDispatch();

  const soccerFieldSize = useSelector(getSoccerFieldSize);

  const newGame = event => {
    event.preventDefault();
    dispatch(setBallPositionData([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]));
    dispatch(resetGameMovesData());
    dispatch(setPlayerTurn(playerOne.Name));
    dispatch(resetPlayersData());
    dispatch(resetAwsDataHistory());
    dispatch(setAwsCurrentMove(''));
  };

  const newRound = () => {
    dispatch(setBallPositionData([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]));
    dispatch(resetGameMovesData());
    dispatch(setPlayerTurn(playerOne.Name));
    dispatch(resetPlayerOneMoves());
    dispatch(resetPlayerTwoMoves());
    dispatch(setEdgeState('none'));
    dispatch(resetAwsDataHistory());
    dispatch(setAwsCurrentMove(''));
  };


  const value = {
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
