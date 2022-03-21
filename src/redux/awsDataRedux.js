/* SELECTORS */
export const getAwsDataHistory = ({awsData}) => awsData.history;
export const getCurrentMove = ({awsData}) => awsData.currentMove;

/* ACTIONS */

// action name creator
const reducerName = 'awsData';
const createActionName = name => `app/${reducerName}/${name}`;

// Action types
const SET_HISTORY = createActionName('SET_HISTORY');
const RESET_HISTORY = createActionName('RESET_HISTORY');
const SET_CURRENT_MOVE = createActionName('SET_CURRENT_MOVE');

// action creators
export const setAwsDataHistory = payload => ({payload, type: SET_HISTORY});
export const resetAwsDataHistory = payload => ({payload, type: RESET_HISTORY});
export const setAwsCurrentMove = payload => ({payload, type: SET_CURRENT_MOVE});

/* thunk creators */

//reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case SET_CURRENT_MOVE: {
      return {
        ...state,
        currentMove: state.currentMove.length === 0
          ? `${action.payload}`
          : `${state.currentMove},${action.payload}`,
      };
    }
    case SET_HISTORY: {
      return {
        ...state,
        history: [...state.history, [...state.currentMove.split(',')]],
        currentMove: '',
      };
    }
    case RESET_HISTORY: {
      return {
        ...state,
        history: [],
      };
    }
    default:
      return state;
  }
}
