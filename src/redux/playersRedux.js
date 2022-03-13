/* SELECTORS */
export const getPlayerOne = ({players}) => players.playerOneData;
export const getPlayerTwo = ({players}) => players.playerTwoData;
export const getPlayerTurn = ({players}) => players.playerTurn;

/* ACTIONS */

// action name creator
const reducerName = 'players';
const createActionName = name => `app/${reducerName}/${name}`;

// Action types
const SET_PLAYER_ONE_MOVES = createActionName('SET_PLAYER_ONE_MOVES');
const SET_PLAYER_ONE_SCORE = createActionName('SET_PLAYER_ONE_SCORE');
const SET_PLAYER_TWO_MOVES = createActionName('SET_PLAYER_TWO_MOVES');
const SET_PLAYER_TWO_SCORE = createActionName('SET_PLAYER_TWO_SCORE');
const SET_PLAYER_TURN = createActionName('SET_PLAYER_TURN');
const RESET_PLAYER_ONE_MOVES = createActionName('RESET_PLAYER_ONE_MOVES');
const RESET_PLAYER_TWO_MOVES = createActionName('RESET_PLAYER_TWO_MOVES');
const RESET_PLAYERS_DATA = createActionName('RESET_PLAYERS_DATA');

// action creators
export const setPlayerOneMoves = payload => ({payload, type: SET_PLAYER_ONE_MOVES});
export const playerOneScore = payload => ({payload, type: SET_PLAYER_ONE_SCORE});
export const setPlayerTwoMoves = payload => ({payload, type: SET_PLAYER_TWO_MOVES});
export const setPlayerTwoScore = payload => ({payload, type: SET_PLAYER_TWO_SCORE});
export const setPlayerTurn = payload => ({payload, type: SET_PLAYER_TURN});
export const resetPlayerOneMoves = payload => ({payload, type: RESET_PLAYER_ONE_MOVES});
export const resetPlayerTwoMoves = payload => ({payload, type: RESET_PLAYER_TWO_MOVES});
export const resetPlayersData = payload => ({payload, type: RESET_PLAYERS_DATA});

/* thunk creators */

//reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case SET_PLAYER_ONE_MOVES: {
      return {
        ...state,
        playerOneData: {
          ...state.playerOneData,
          Moves: [...state.playerOneData.Moves, action.payload],
        },
      };
    }
    case RESET_PLAYER_ONE_MOVES: {
      return {
        ...state,
        playerOneData: {
          ...state.playerOneData,
          Moves: [],
        },
      };
    }
    case SET_PLAYER_ONE_SCORE: {
      return {
        ...state,
        playerOneData: {
          ...state.playerOneData,
          Score: state.playerOneData.Score + 1,
        },
      };
    }
    case SET_PLAYER_TWO_MOVES: {
      return {
        ...state,
        playerTwoData: {
          ...state.playerTwoData,
          Moves: [...state.playerTwoData.Moves, action.payload],
        },
      };
    }
    case RESET_PLAYER_TWO_MOVES: {
      return {
        ...state,
        playerTwoData: {
          ...state.playerTwoData,
          Moves: [],
        },
      };
    }
    case SET_PLAYER_TWO_SCORE: {
      return {
        ...state,
        playerTwoData: {
          ...state.playerTwoData,
          Score: state.playerTwoData.Score + 1,
        },
      };
    }
    case SET_PLAYER_TURN: {
      return {
        ...state,
        playerTurn: action.payload,
      };
    }
    case RESET_PLAYERS_DATA: {
      return {
        ...state,
        playerOneData: {
          ...state.playerOneData,
          Moves: [],
          Score: 0,
        },
        playerTwoData: {
          ...state.playerTwoData,
          Moves: [],
          Score: 0,
        },
      };
    }
    default:
      return state;
  }
}
