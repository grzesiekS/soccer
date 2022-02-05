import React, {useState, createContext} from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [soccerFieldSize, setSoccerFieldSize] = useState([7, 9]);
  const [ballPosition, setBallPosition] = useState([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]);
  const [gameMoves, setGameMoves] = useState([]);

  const value = {
    soccerFieldSizeContext: [soccerFieldSize, setSoccerFieldSize],
    ballPositionContext: [ballPosition, setBallPosition],
    gameMovesContext: [gameMoves, setGameMoves],
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
