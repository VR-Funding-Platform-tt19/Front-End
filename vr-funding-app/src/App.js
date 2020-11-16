import React from 'react'

import { Switch, Route, Link } from 'react-router-dom'

import { PrivateRoute } from './Utils/PrivateRoute'

//-------- Components ---------
import SignIn from './Component/SignIn'
import ProjectDashboard from './Component/ProjectDashboard'
import Project from './Component/Project'
import ContactUs from './Component/ContactUs'
import ForgotPassword from './Component/ForgotPassword'
import SignUp from './Component/SignUp'

function App() {



  // Will need to add routing here
  return (
    <div className="App">
      <h1>We Are In App.JS</h1>

      <Switch>
        {/* These are the main routes */}
        <Route exact path='/' component={SignIn}/>
        <PrivateRoute exact path='/dashboard' component={ProjectDashboard}/>
        <Route exact path='/project/:id/' component={Project}/>
        <Route exact path='/signUp' component={SignUp}/> {/* So we will need to add a link to this some where */}

        {/* additional routes */}
        <Route exact path='/contact' component={ContactUs}/>
        <Route excact path='/resetPassword' component={ForgotPassword}/>
      </Switch>
    </div>
  );
}

export default App;
