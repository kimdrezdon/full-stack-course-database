import React, { Component } from 'react';

class UpdateCourse extends Component {
    state = {
        courseOwner: {},
        courseTitle: '',
        courseDescription: '',
        courseEstimatedTime: '',
        courseMaterialsNeeded: ''
    }

    componentDidMount() {
        const url = 'http://localhost:5000/api/courses/' + this.props.match.params.id;
        fetch(url)
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    courseOwner: responseData.User,
                    courseTitle: responseData.title,
                    courseDescription: responseData.description,
                    courseEstimatedTime: (responseData.estimatedTime ? responseData.estimatedTime : ''),
                    courseMaterialsNeeded: (responseData.materialsNeeded ? responseData.materialsNeeded : '')
                });
            })
            .catch(error => {
                console.log('Error fetching data', error);
            });
    }

    updateCourse = (courseId) => {
        const url = 'http://localhost:5000/api/courses/' + courseId;
        const options = { method: 'PUT' }
        fetch(url, options);
        this.props.history.push(`/courses/${courseId}`);
    }

    handleCancel = e => {
        e.preventDefault();
        const courseId = this.props.match.params.id;
        this.props.history.push(`/courses/${courseId}`);
    }

    handleChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name] : value
        })
    }

    render() { 
        const {
            courseOwner,
            courseTitle,
            courseDescription,
            courseEstimatedTime,
            courseMaterialsNeeded
        } = this.state;

        return ( 
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <form>
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <div>
                                    <input 
                                        id="title" 
                                        name="courseTitle" 
                                        type="text" 
                                        className="input-title course--title--input" 
                                        placeholder="Course title..."
                                        value={courseTitle} 
                                        onChange={this.handleChange} />
                                </div>
                                <p>By {courseOwner.firstName} {courseOwner.lastName}</p>
                            </div>
                            <div className="course--description">
                                <div>
                                    <textarea 
                                        id="description" 
                                        name="courseDescription" 
                                        className="" 
                                        placeholder="Course description..." 
                                        value={courseDescription}
                                        onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="courseEstimatedTime" 
                                                type="text" 
                                                className="course--time--input"
                                                placeholder="Hours" 
                                                value={courseEstimatedTime}
                                                onChange={this.handleChange} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="courseMaterialsNeeded" 
                                                className="" 
                                                placeholder="List materials..." 
                                                value={courseMaterialsNeeded}
                                                onChange={this.handleChange} />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="grid-100 pad-bottom">
                            <button onClick={() => {this.updateCourse(this.props.match.params.id)}} className="button" type="submit">Update Course</button>
                            <button className="button button-secondary" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default UpdateCourse;