import React, { Component } from 'react';

class CourseDetail extends Component {
    state = {
        courses: []
    };
    
    componentDidMount() {
        this.loadCourses();
    };

    loadCourses = () => {
        fetch('http://localhost:5000/api/courses')
            .then(response => response.json())
            .then(responseData => {
                this.setState({ courses: responseData });
            })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    }

    render() { 
        // const selectedCourse = this.state.courses[1];

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <a className="button" href="update-course.html">Update Course</a>
                                <a className="button" href="delete-course.html">Delete Course</a>
                            </span>
                            <a className="button button-secondary" href="index.html">Return to List</a>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            {/* <h3 className="course--title">{selectedCourse.title}</h3> */}
                            {/* <p>By {selectedCourse.userId}</p> */}
                        </div>
                        <div className="course--description">
                            {/* <p>{selectedCourse.description}</p> */}
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    {/* <h3>{selectedCourse.estimatedTime}</h3> */}
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ul>
                                        {/* <li>{selectedCourse.materialsNeeded}</li> */}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default CourseDetail;