import React, { useContext, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import CourseContext from '../../context/course/courseContext';

const Courses = () => {
	const courseContext = useContext(CourseContext);
	const { getCourses, courses, loading } = courseContext;

	useEffect(() => {
		getCourses();
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			{courses !== null && !loading ? (
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
				))
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Courses;
