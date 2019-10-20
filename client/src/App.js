import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import Header from "./components/Header";
import UserSignOut from './components/UserSignOut';

const App = () => (
  <BrowserRouter>
    <div>
      <Header />
      <hr></hr>
      <Route exact path="/" component={Courses} />
      <Route path="/courses/create" component={CreateCourse} />
      <Route path="/courses/:id/update" component={UpdateCourse} />
      <Route path="/courses/:id" component={CourseDetail} />
      <Route path="/signin" component={UserSignIn} />
      <Route path="/signup" component={UserSignUp} />
      <Route path="/signout" component={UserSignOut} />
    </div>
  </BrowserRouter>
  
)

export default App;
