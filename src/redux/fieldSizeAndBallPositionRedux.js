/* SELECTORS */
export const getSoccerFieldSize = ({fieldSizeAndBallPosition}) => fieldSizeAndBallPosition.soccerFieldSize;
export const getBallPosition = ({fieldSizeAndBallPosition}) => fieldSizeAndBallPosition.ballPosition;
export const getEdgeState = ({fieldSizeAndBallPosition}) => fieldSizeAndBallPosition.edgeState;

/* ACTIONS */

// action name creator
const reducerName = 'fieldSizeAndBallPosition';
const createActionName = name => `app/${reducerName}/${name}`;

// Action types
const SET_BALL_POSITION = createActionName('SET_BALL_POSITION');
const SET_EDGE_STATE = createActionName('SET_EDGE_STATE');

// action creators
export const setBallPositionData = payload => ({payload, type: SET_BALL_POSITION});
export const setEdgeState = payload => ({payload, type: SET_EDGE_STATE});

/* thunk creators */

//reducer
export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case SET_BALL_POSITION: {
      return {
        ...state,
        ballPosition: action.payload,
      };
    }
    case SET_EDGE_STATE: {
      return {
        ...state,
        edgeState: action.payload,
      };
    }
    default:
      return state;
  }
}
