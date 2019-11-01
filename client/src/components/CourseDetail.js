import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const ReactMarkdown = require('react-markdown');

class CourseDetail extends Component {
    state = {
        course: {},
        courseOwner: {}
    };
    
    componentDidMount() {
        const courseId = this.props.match.params.id;
        this.props.context.actions.getCourse(courseId)
            .then(responseData => {
                this.setState({ 
                    course: responseData, 
                    courseOwner: responseData.User 
                });
            })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    };

    deleteCourse = (courseId) => {
        this.props.context.actions.deleteCourse(courseId);
        this.props.history.push('/courses');
    }

    render() {
        const { 
            course, 
            courseOwner 
        } = this.state;

        return (
            <div>
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            <ButtonsDisplay authenticatedUser={this.props.context.authenticatedUser}
                                            courseOwner={courseOwner}
                                            courseId={this.props.match.params.id}
                                            deleteCourse={this.deleteCourse} />
                            <Link to="/courses" className="button button-secondary">Return to List</Link>
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

const ButtonsDisplay = (props) => {
    const {
        authenticatedUser,
        courseOwner,
        courseId,
        deleteCourse
    } = props

    let buttonsDisplay = null;
    const userId = authenticatedUser.id;
    const courseOwnerId = courseOwner.id;
    
    if (authenticatedUser) {
        if (userId === courseOwnerId) {
            buttonsDisplay = (
                <span>
                    <Link to={`/courses/${courseId}/update`} className="button">Update Course</Link>
                    <Link to="/courses" onClick={() => {deleteCourse(courseId)}} className="button">Delete Course</Link>
                </span>
            )
        }
    }

    return buttonsDisplay;   
}
 
export default CourseDetail;