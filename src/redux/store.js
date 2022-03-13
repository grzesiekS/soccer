import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import playersData from './data/players.json';
import soccerFieldAndBallPositionData from './data/fieldSizeAndBallPosition.json';

import globalReducer from './globalRedux';
import fieldSizeAndBallPositionReducer from './fieldSizeAndBallPositionRedux';
import gameMovesReducer from './gameMovesRedux';
import playersReducer from './playersRedux';

const initialState = {
  players: playersData,
  fieldSizeAndBallPosition: soccerFieldAndBallPositionData,
  gameMoves: [],
};

// define reducers
const reducers = {
  fieldSizeAndBallPosition: fieldSizeAndBallPositionReducer,
  gameMoves: gameMovesReducer,
  players: playersReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

// combine reducers
const combinedReducers = combineReducers(reducers);

// merge all reducers with globalReducer
const storeReducer = (state, action) => {
  const modifiedState = globalReducer(state, action);
  return combinedReducers(modifiedState, action);
};

// create store
const store = createStore(
  storeReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
);

export default store;
