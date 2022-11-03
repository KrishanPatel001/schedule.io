import React, {Component} from 'react';
import { useEffect } from 'react';
import "../App.css"
import axios from 'axios';

export class getTestData extends Component {

    constructor(props) {
      super(props);
      this.state = {courses: [], loading: true };

     
    }


    getCourseData() {
        axios
            .get(`/courses`, {})
            .then(res => {
                const data = res.data
                console.log(data)

            })
            .catch((error) => {
                console.log(error)
            })
        }
  
    componentDidMount() {
      this.getCourseData();
    }
  
    static renderCoursesTable(courses) {
      return (
        <table className='table table-striped gold' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Course Name:</th>
              <th>Time Start:</th>
              <th>Time End:</th>
              <th>resource:</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course =>
              <tr key={course.text}>
                <td>{course.start}</td>
                <td>{course.end}</td>
                <td>{course.resource}</td>
                <td>{course.id}</td>
              </tr>
            )}
          </tbody>
        </table>
      );
    }
  
    render() {
      let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : getTestData.renderCoursesTable(this.state.courses);
  
      return (
        <div>
          <h1 id="tabelLabel" >Courses</h1>
          <p>This component demonstrates fetching data from the server.</p>
          {contents}
        </div>
      );
    }
  
}