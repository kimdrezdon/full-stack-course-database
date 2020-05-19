import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseContext from '../../context/course/courseContext';
import Spinner from '../layout/Spinner';
const ReactMarkdown = require('react-markdown');

const CourseDetail = ({ match }) => {
	const courseContext = useContext(CourseContext);
	const { getCourse, current, loading } = courseContext;

	useEffect(() => {
		getCourse(match.params.id);
		// eslint-disable-next-line
	}, []);

	const {
		id,
		title,
		description,
		estimatedTime,
		materialsNeeded,
		User
	} = current;

	// state = {
	//     course: {},
	//     courseOwner: {}
	// };

	// componentDidMount() {
	//     //retrieves course data from the API
	//     const courseId = this.props.match.params.id;
	//     this.props.context.actions.getCourse(courseId)
	//         .then(responseData => {
	//             if (responseData !== null) {
	//                 //sets course state if course found
	//                 this.setState({
	//                     course: responseData,
	//                     courseOwner: responseData.User
	//                 });
	//             } else {
	//                 //redirects user if course not found
	//                 this.props.history.push('/notfound');
	//             }
	//         })
	//         .catch(error => {
	//             console.log(error);
	//             this.props.history.push('/error');
	//         });
	// };

	// const deleteCourse = courseId => {
	// 	//deletes a course
	// 	this.props.context.actions
	// 		.deleteCourse(courseId)
	// 		.then(response => {
	// 			if (response.status === 204) {
	// 				//redirects to course list if course successfully deleted
	// 				this.props.history.push('/courses');
	// 			} else if (response.status === 404) {
	// 				//redirects to notFound if course doesn't exist
	// 				this.props.history.push('/notfound');
	// 			} else if (response.status === 403) {
	// 				//redirects to forbidden if current user doesn't own the course
	// 				this.props.history.push('/forbidden');
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 			this.props.history.push('/error');
	// 		});
	// };

	if (loading) {
		return <Spinner />;
	}

	return (
		<div>
			<div className='actions--bar'>
				<div className='bounds'>
					<div className='grid-100'>
						{/* <ButtonsDisplay
							authenticatedUser={
								this.props.context.authenticatedUser
							}
							courseOwner={User}
							courseId={match.params.id}
							deleteCourse={deleteCourse}
						/> */}
						<Link to='/courses' className='button button-secondary'>
							Return to List
						</Link>
					</div>
				</div>
			</div>
			{current !== null &&
				!loading(
					<div className='bounds course--detail'>
						<div className='grid-66'>
							<div className='course--header'>
								<h4 className='course--label'>Course</h4>
								<h3 className='course--title'>{title}</h3>
								<p>
									By {User.firstName} {User.lastName}
								</p>
							</div>
							<div className='course--description'>
								<ReactMarkdown source={description} />
							</div>
						</div>
						<div className='grid-25 grid-right'>
							<div className='course--stats'>
								<ul className='course--stats--list'>
									<li className='course--stats--list--item'>
										<h4>Estimated Time</h4>
										<h3>{estimatedTime}</h3>
									</li>
									<li className='course--stats--list--item'>
										<h4>Materials Needed</h4>
										<ReactMarkdown
											source={materialsNeeded}
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				)}
		</div>
	);
};

//conditionally renders the Update Course and Delete Course buttons, only displaying them if the current user is the course owner
// const ButtonsDisplay = props => {
// 	const { authenticatedUser, courseOwner, courseId, deleteCourse } = props;

// 	let buttonsDisplay = null;

// 	if (authenticatedUser) {
// 		if (authenticatedUser.id === courseOwner.id) {
// 			buttonsDisplay = (

// 			);
// 		}
// 	}

// 	return buttonsDisplay;
// };

export default CourseDetail;
