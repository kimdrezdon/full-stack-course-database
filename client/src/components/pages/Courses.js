import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseContext from '../../context/course/courseContext';
import AddCourse from '../layout/AddCourse';

const Courses = () => {
	const courseContext = useContext(CourseContext);
	const { getCourses, courses } = courseContext;

	useEffect(() => {
		getCourses();
		// eslint-disable-next-line
	}, []);

	// componentDidMount() {
	// 	//retrieves all course data from the API
	// 	this.props.context.actions
	// 		.getCourses()
	// 		.then(responseData => {
	// 			//sets courses state if successful
	// 			this.setState({ courses: responseData });
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 			this.props.history.push('/error');
	// 		});
	// }

	return (
		<div className='bounds'>
			{courses !== null &&
				courses.map(course => (
					<div key={course.id} className='grid-33'>
						<Link
							to={`/courses/${course.id}`}
							className='course--module course--link'
						>
							<h4 className='course--label'>Course</h4>
							<h3 className='course--title'>{course.title}</h3>
						</Link>
					</div>
				))}
			<AddCourse />
		</div>
	);
};

export default Courses;
