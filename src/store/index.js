/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";

// import debug from '../middlewares/debug';
import user from "../middlewares/user";
import brewery from "../middlewares/brewery";
import category from "../middlewares/category";

const middlewares = applyMiddleware(brewery, category, user);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(middlewares);

const store = createStore(reducer, enhancers);

export default store;
