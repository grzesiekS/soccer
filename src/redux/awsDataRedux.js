/* SELECTORS */
export const getAwsDataHistory = ({awsData}) => awsData.history;
export const getCurrentMove = ({awsData}) => awsData.currentMove;
export const getUserStarts = ({awsData}) => awsData.userStarts;

/* ACTIONS */

// action name creator
const reducerName = 'awsData';
const createActionName = name => `app/${reducerName}/${name}`;

// Action types
const SET_HISTORY = createActionName('SET_HISTORY');
const RESET_HISTORY = createActionName('RESET_HISTORY');
const SET_CURRENT_MOVE = createActionName('SET_CURRENT_MOVE');
const RESET_CURRENT_MOVE = createActionName('RESET_CURRENT_MOVE');
const SET_USER_START = createActionName('SET_USER_START');

// action creators
export const setAwsDataHistory = payload => ({payload, type: SET_HISTORY});
export const resetAwsDataHistory = payload => ({payload, type: RESET_HISTORY});
export const setAwsCurrentMove = payload => ({payload, type: SET_CURRENT_MOVE});
export const resetAwsCurrentMove = payload => ({payload, type: RESET_CURRENT_MOVE});
export const setUserStart = payload => ({payload, type: SET_USER_START});

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
    case RESET_CURRENT_MOVE: {
      return {
        ...state,
        currentMove: '',
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
    case SET_USER_START: {
      return {
        ...state,
        userStarts: action.payload,
      };
    }
    default:
      return state;
  }
}
