import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import Header from "./components/Header";
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <hr></hr>
      <Switch>
        <Route exact path="/" render={() => <Redirect to ="/courses" />} />
        <Route exact path="/courses" component={Courses} />
        <Route path="/courses/create" component={CreateCourse} />
        <Route path="/courses/:id/update" component={UpdateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
  
)

export default App;
