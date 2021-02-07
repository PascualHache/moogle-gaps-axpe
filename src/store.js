import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import invariant from 'redux-immutable-state-invariant';
import rootReducer from "./reducers";
import * as actionCreators from './actions/map';

const middleware = [thunk];
// const middleware = process.env.NODE_ENV !== 'production' ?
//   [require('redux-immutable-state-invariant').default(), thunk] :
//   [thunk];

const composeEnhancers = composeWithDevTools({ actionCreators, trace: true, traceLimit: 25 });

const store = createStore(
  rootReducer,
  // composeEnhancers(
  // applyMiddleware(invariant(), thunk)
  composeWithDevTools(applyMiddleware(...middleware))
// )
);

export default store;