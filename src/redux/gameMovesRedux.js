/* SELECTORS */
export const getGameMoves = ({gameMoves}) => gameMoves;

/* ACTIONS */

// action name creator
const reducerName = 'gameMoves';
const createActionName = name => `app/${reducerName}/${name}`;

// Action types
const SET_GAME_MOVES = createActionName('SET_GAME_MOVES');
const RESET_GAME_MOVES = createActionName('RESET_GAME_MOVES');

// action creators
export const setGameMovesData = payload => ({payload, type: SET_GAME_MOVES});
export const resetGameMovesData = payload => ({payload, type: RESET_GAME_MOVES});

/* thunk creators */

//reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case SET_GAME_MOVES: {
      return [
        ...state,
        action.payload,
      ];
    }
    case RESET_GAME_MOVES: {
      return [];
    }
    default:
      return state;
  }
}
