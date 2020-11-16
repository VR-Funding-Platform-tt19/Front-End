//----- Styles -------
// import './index.css';

//------ Imported Dependencies ---------
import React from 'react';
import ReactDOM from 'react-dom';

// -------- Redux Dependencies ---------
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

// --------- Reducer Function -----------
import { reducer } from './store/reducer'

//----- Components --------
import App from './App';




// ---- Redux Store for passing Props
const store = createStore(reducer, applyMiddleware(thunk, logger))
// Question: What state properties are we going to manage in Redux?
//  - Form Data should be managed via component state
//  - 


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
