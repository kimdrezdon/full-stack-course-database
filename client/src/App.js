import React, { Component } from 'react';

class App extends Component {
  state = {
    courses: []
  };
  
  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(responseData => {
        this.setState({ courses: responseData });
        console.log(this.state.courses);
      })
      .catch(error => {
        console.log('Error fetching data', error);
      });
  };
  
  render () {
    const courseList = this.state.courses.map(course =>
        <li key={course.id}>{course.title}</li>
    )

    return (
      <div className="App">
        <ul>
          {courseList}
        </ul>
      </div>
    );
  }
}

export default App;
