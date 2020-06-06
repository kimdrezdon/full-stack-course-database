import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import CourseContext from '../../context/course/courseContext';
import AuthContext from '../../context/auth/authContext';
const ReactMarkdown = require('react-markdown');

const CourseDetail = ({ match, history }) => {
	const authContext = useContext(AuthContext);
	const { user, loadUser } = authContext;
	const courseContext = useContext(CourseContext);
	const {
		getCourse,
		current,
		loading,
		deleteCourse,
		clearCurrent
	} = courseContext;

	useEffect(() => {
		getCourse(match.params.id);

		// Stay authenticated even when page is refreshed
		loadUser();

		// eslint-disable-next-line
	}, []);

	const handleDelete = () => {
		deleteCourse(match.params.id).then(() => history.push('/courses'));
	};

	return (
		<div>
			{current !== null && !loading ? (
				<Fragment>
					<div className='actions--bar'>
						<div className='bounds'>
							<div className='grid-100'>
								{/* conditionally renders the Update Course and
								Delete Course buttons, only displaying them if
								the current user is the course owner */}
								{user !== null && user.id === current.User.id && (
									<span>
										<Link
											to={`/courses/${match.params.id}/update`}
											className='button'
										>
											Update Course
										</Link>
										<button
											onClick={handleDelete}
											className='button'
										>
											Delete Course
										</button>
									</span>
								)}
								<Link
									to='/courses'
									className='button button-secondary'
								>
									Return to List
								</Link>
							</div>
						</div>
					</div>

					<div className='bounds course--detail'>
						<div className='grid-66'>
							<div className='course--header'>
								<h4 className='course--label'>Course</h4>
								<h3 className='course--title'>
									{current.title}
								</h3>
								<p>
									By {current.User.firstName}{' '}
									{current.User.lastName}
								</p>
							</div>
							<div className='course--description'>
								<ReactMarkdown source={current.description} />
							</div>
						</div>
						<div className='grid-25 grid-right'>
							<div className='course--stats'>
								<ul className='course--stats--list'>
									<li className='course--stats--list--item'>
										<h4>Estimated Time</h4>
										<h3>{current.estimatedTime}</h3>
									</li>
									<li className='course--stats--list--item'>
										<h4>Materials Needed</h4>
										<ReactMarkdown
											source={current.materialsNeeded}
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</Fragment>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default CourseDetail;
