import React, {Component} from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import TableScrollbar from 'react-table-scrollbar';
import "../App.css"
import axios from 'axios';
import SearchBar from './Search';

/*styles for left right split*/
const styles = {
    wrap: {
      display: "flex",
    },
    left: {
      marginRight: "30px",
    },
    main: {
      flexGrow: "1",
    }
  };

/*styles for scrollable list*/
const Container = styled.div`
  background: #12130f;
  display: flex;
  justify-content: center; 
  flex-flow: column wrap; 
  width: 100%;
  height: 10%;
`;
const List = styled.div`
  display: flex;
  justify-content: center; 
  flex-flow: row wrap; 
`;
 

export class getTestData extends Component {

    constructor(props) {
      super(props);
      this.state = {courses: [], mycourses: [], loading: false}; 
    }


    componentDidMount() {
      this.getCourseData();
      //this.getMyCourseData();
        }

   static renderCoursesTable(courses,mycourses){
      return (
        <div className='studentPage'>
        <div style={styles.wrap}>
          <div style={styles.left}>
            <div className="container">
            <h3 className="p-3 text-center">Spring&nbsp;2023&nbsp;Courses</h3>
            <div className="searchBar">
 
            </div>
            <TableScrollbar  height="540px">
        <table className='table table gold' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Course Name:</th>
              <th>Open: </th>
              <th>Day:</th>
              <th>Time Start:</th>
              <th>Time End:</th>
              <th>Options:</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course =>
              <tr key={course.text}>
                <td value={course.text} name="course_text">{course.text}</td>
                <td value={course.isOpen} name="course_isOpen">{course.isOpen}</td>
                <td value={course.resource} name="course_resource">{course.resource}</td>
                <td value={course.start} name="course_start">{course.start}</td>
                <td value={course.end} name="course_end">{course.end}</td>
                <td><button className='addButton' name="submit" value="Submit" onClick={this.handleSubmit}>Add</button></td>
              </tr>
            )}
          </tbody>
        </table>
        </TableScrollbar>
        </div>
        </div>
        <div className="mycoursesTable">
        <p className='p-3 text-center'>Your course schedule:</p>
        <table className='table1 table gold' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Course Name:</th>
          <th>Day:</th>
          <th>Time Start:</th>
          <th>Time End:</th>
          <th>Options:</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {mycourses.map(mycourse =>
              <tr key={mycourse.courses}>
                <td>{mycourse.courses}</td>
                <td>{mycourse.resource}</td>
                <td>{mycourse.start}</td>
                <td>{mycourse.end}</td>
                <td><button className='addButton'name="submit" value="Submit">Drop</button></td>
            </tr>
            )}
      </tbody>
    </table>
    </div>
        </div>
        </div>
      );
    }

   
    render() {
      let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : getTestData.renderCoursesTable(this.state.courses, this.state.mycourses);
     /* let mycontents = this.state.loading
        ? <p><em>Loading...</em></p>
        : getTestData.renderMyCoursesTable(this.state.mycourses);*/
  
      return (
        <div className='studentPage'>
        <div style={styles.wrap}>
        <div>
          <h1 id="tabelLabel" >Welcome, Student</h1>
          <p>View and Edit your course schedule below</p>
          {contents}
        </div>
       </div>
       </div>
      );
    }
    async getCourseData() {
           const response = await fetch('/course');
            const data = await response.json();
            const response2 = await fetch('/mycourse');
            const data2 = await response2.json();
           this.setState({ courses: data,  mycourses: data2, loading: false });
           
         }
    async handleSubmit() {
      const [status, setStatus] = useState('');
      const [course_text, setCourseText] = useState("");
      const [course_resource, setCourseResource] = useState("");
      const [course_start, setCourseStart] = useState(""); 
          console.log("clicked add");
              axios.post(`/mycourse`, {
                  course_text: {course_text},
                  course_resource: {course_resource},
                  course_start: {course_start}
              })
              .then(response => {
                  setStatus(response.status);
              })
              .catch(error => {
                this.setState({ errorMessage: error.message });
            });
        //  }
        }
     

    /*async getMyCourseData(){
        // axios
        axios.get('/mycourse')
        .then(response => {
            console.log(response.data);
            const data = response.json();
            this.setState({ mycourses: data, loading: false });
          }, error => {
            console.log(error);
          });

          const response = await fetch('/mycourse');
            const data = await response.json();
           this.setState({ mycourses: data, loading: false });

                  }*/

}