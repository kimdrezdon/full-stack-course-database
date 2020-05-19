import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

//import the withContext function from Context
import withContext from './Context';

// Import Context
import CourseState from './context/course/CourseState';

//import components
import PrivateRoute from './components/routing/PrivateRoute';
import Courses from './components/pages/Courses';
import CourseDetail from './components/courses/CourseDetail';
import UserSignIn from './components/auth/UserSignIn';
import CreateCourse from './components/courses/CreateCourse';
import UpdateCourse from './components/courses/UpdateCourse';
import UserSignUp from './components/auth/UserSignUp';
import Header from './components/layout/Header';
import UserSignOut from './components/auth/UserSignOut';
import NotFound from './components/pages/NotFound';
import UnhandledError from './components/pages/UnhandledError';
import Forbidden from './components/pages/Forbidden';

//connect components to context
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);

const App = () => (
	<CourseState>
		<BrowserRouter>
			<div>
				<HeaderWithContext />
				<hr></hr>
				<Switch>
					<Route
						exact
						path='/'
						render={() => <Redirect to='/courses' />}
					/>
					<Route exact path='/courses' component={Courses} />
					<PrivateRoute
						path='/courses/create'
						component={CreateCourseWithContext}
					/>
					<PrivateRoute
						path='/courses/:id/update'
						component={UpdateCourseWithContext}
					/>
					<Route
						exact
						path='/courses/:id'
						component={CourseDetailWithContext}
					/>
					<Route path='/signin' component={UserSignInWithContext} />
					<Route path='/signup' component={UserSignUpWithContext} />
					<Route path='/signout' component={UserSignOutWithContext} />
					<Route path='/notfound' component={NotFound} />
					<Route path='/error' component={UnhandledError} />
					<Route path='/forbidden' component={Forbidden} />
					<Route component={NotFound} />
				</Switch>
			</div>
		</BrowserRouter>
	</CourseState>
);

export default App;
