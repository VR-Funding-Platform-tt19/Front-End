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
import { reducer } from './Store/Reducers/index'

// --------- Routing ----------------
import { BrowserRouter as Router } from 'react-router-dom'

//----- Components --------
import App from './App';



// ---- Redux Store for passing Props
const store = createStore(reducer, applyMiddleware(thunk, logger))
// Question: What state properties are we going to manage in Redux?
//  - Form Data should be managed via component state
//  - 


ReactDOM.render(
  <Router>
    <Provider store={store}>
        <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
