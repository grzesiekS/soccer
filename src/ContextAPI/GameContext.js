import React, {useState, createContext} from 'react';
import PropTypes from 'prop-types';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [soccerFieldSize, setSoccerFieldSize] = useState([7, 9]);

  const value = {
    soccerFieldSize: [soccerFieldSize, setSoccerFieldSize],
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
