import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component {
    state = {
        course: {},
        courseOwner: {}
    };
    
    componentDidMount() {
        const url = 'http://localhost:5000/api/courses/' + this.props.match.params.id;
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                this.setState({ course: responseData, courseOwner: responseData.User });
            })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    };

    deleteCourse = (courseId) => {
        const url = 'http://localhost:5000/api/courses/' + courseId;
        const options = { method: 'DELETE' }
        fetch(url, options);
    }

    render() {
        const { course, courseOwner } = this.state;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <span>
                                <Link to={`/courses/${this.props.match.params.id}/update`} className="button">Update Course</Link>
                                <Link to="/courses" onClick={() => {this.deleteCourse(this.props.match.params.id)}} className="button">Delete Course</Link>
                            </span>
                            <Link to="/courses/" className="button button-secondary">Return to List</Link>
                        </div>
                    </div>
                </div>
                <div className="bounds course--detail">
                    <div className="grid-66">
                        <div className="course--header">
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                            <p>By {courseOwner.firstName} {courseOwner.lastName}</p>
                        </div>
                        <div className="course--description">
                            <ReactMarkdown source={course.description} />
                        </div>
                    </div>
                    <div className="grid-25 grid-right">
                        <div className="course--stats">
                            <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown source={course.materialsNeeded} />
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