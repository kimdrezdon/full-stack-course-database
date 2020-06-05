import React, { useState, useContext, useEffect } from 'react';
import ErrorsDisplay from '../layout/ErrorsDisplay';
import AuthContext from '../../context/auth/authContext';
import CourseContext from '../../context/course/courseContext';

const CreateCourse = props => {
	const authContext = useContext(AuthContext);
	const { user, loadUser, isAuthenticated } = authContext;
	const courseContext = useContext(CourseContext);
	const { createCourse } = courseContext;

	useEffect(() => {
		// Stay authenticated even when page is refreshed
		loadUser();
		// eslint-disable-next-line
	}, []);

	const [course, setCourse] = useState({
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: ''
	});

	const { title, description, estimatedTime, materialsNeeded } = course;

	//redirects to course list when cancel button is clicked
	const handleCancel = e => {
		e.preventDefault();
		props.history.push('/courses');
	};

	//updates state with the value of each input element
	const handleChange = e => {
		setCourse({
			...course,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (isAuthenticated) {
			//if there is a user signed in, sends a request to the API to create a course with user's input data

			createCourse({
				title,
				description,
				estimatedTime,
				materialsNeeded
			}).then(() => {
				props.history.push('/courses');
			});
		}
		// 		.then(errors => {
		// 			if (errors.length) {
		// 				//if there are errors, sets the errors state
		// 				this.setState({ errors });
		// 			} else {
		// 				//if there aren't any errors, redirects to the course list
		// 				this.props.history.push('/courses');
		// 			}
		// 		})
		// 		.catch(error => {
		// 			console.log(error);
		// 			this.props.history.push('/error');
		// 		});
		// } else {
		// 	//if there isn't a user signed in, redirects to the sign in page
		// 	this.props.history.push('/signin');
		// }
	};

	return (
		<div className='bounds course--detail'>
			<h1>Create Course</h1>
			<div>
				{/* <ErrorsDisplay errors={errors} /> */}
				<form onSubmit={handleSubmit}>
					<div className='grid-66'>
						<div className='course--header'>
							<h4 className='course--label'>Course</h4>
							<div>
								<input
									id='title'
									name='title'
									type='text'
									className='input-title course--title--input'
									placeholder='Course title...'
									value={title}
									onChange={handleChange}
								/>
							</div>
							<p>
								By {user && user.firstName}{' '}
								{user && user.lastName}
							</p>
						</div>
						<div className='course--description'>
							<div>
								<textarea
									id='description'
									name='description'
									className=''
									placeholder='Course description...'
									value={description}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>
					<div className='grid-25 grid-right'>
						<div className='course--stats'>
							<ul className='course--stats--list'>
								<li className='course--stats--list--item'>
									<h4>Estimated Time</h4>
									<div>
										<input
											id='estimatedTime'
											name='estimatedTime'
											type='text'
											className='course--time--input'
											placeholder='Hours'
											value={estimatedTime}
											onChange={handleChange}
										/>
									</div>
								</li>
								<li className='course--stats--list--item'>
									<h4>Materials Needed</h4>
									<div>
										<textarea
											id='materialsNeeded'
											name='materialsNeeded'
											className=''
											placeholder='List materials...'
											value={materialsNeeded}
											onChange={handleChange}
										/>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div className='grid-100 pad-bottom'>
						<button className='button' type='submit'>
							Create Course
						</button>
						<button
							className='button button-secondary'
							onClick={handleCancel}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateCourse;
