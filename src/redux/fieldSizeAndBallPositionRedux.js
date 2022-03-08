/* SELECTORS */
export const getSoccerFieldSize = ({fieldSizeAndBallPosition}) => fieldSizeAndBallPosition.soccerFieldSize;
export const getBallPosition = ({fieldSizeAndBallPosition}) => fieldSizeAndBallPosition.ballPosition;

/* ACTIONS */

// action name creator
const reducerName = 'fieldSizeAndBallPosition';
const createActionName = name => `app/${reducerName}/${name}`;

// Action types
const SET_BALL_POSITION = createActionName('SET_BALL_POSITION');

// action creators
export const setBallPositionData = payload => ({payload, type: SET_BALL_POSITION});

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
    default:
      return state;
  }
}
