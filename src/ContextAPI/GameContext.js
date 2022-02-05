import React, {useState, createContext} from 'react';
import PropTypes from 'prop-types';

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

  const [soccerFieldSize, setSoccerFieldSize] = useState([7, 9]);
  const [ballPosition, setBallPosition] = useState([Math.round((soccerFieldSize[1] - 1)/2), Math.round((soccerFieldSize[0] - 1)/2)]);
  const [gameMoves, setGameMoves] = useState([]);
  const [playerOne, setPlayerOne] = useState(playerOneData);
  const [playerTwo, setPlayerTwo] = useState(playerTwoData);
  const [playerTurn, setPlayerTurn] = useState(playerOne.Name);

  const value = {
    soccerFieldSizeContext: [soccerFieldSize, setSoccerFieldSize],
    ballPositionContext: [ballPosition, setBallPosition],
    gameMovesContext: [gameMoves, setGameMoves],
    playerOneContext: [playerOne, setPlayerOne],
    playerTwoContext: [playerTwo, setPlayerTwo],
    playerTurnContext: [playerTurn, setPlayerTurn],
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
