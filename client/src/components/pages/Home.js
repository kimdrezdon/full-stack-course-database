import React, { useContext, useEffect } from 'react';
import AddCourse from '../layout/AddCourse';
import Courses from '../courses/Courses';

const Home = () => {
	return (
		<div className='bounds'>
			<Courses />
			<AddCourse />
		</div>
	);
};

export default Home;
