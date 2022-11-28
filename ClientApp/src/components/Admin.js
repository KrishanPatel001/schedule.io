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

export class getAdminCourses extends Component {

    constructor(props) {
      super(props);
      this.state = {courses: [], mycourses: [], articles: [], loading: false}; 


    }
     
    componentDidMount() {
      this.getCourseData();
      //this.getMyCourseData();
        }

   static renderCoursesTable(courses,mycourses){
      return (
        <div className='studentPage'>
        <div style={styles.wrap}>
            <div className="container">
            <h3 className="p-3 text-center">Spring&nbsp;2023&nbsp;Courses</h3>
            <div className="searchBar">
            <SearchBar />
            </div>
            <TableScrollbar  height="540px">
        <table className='table table gold' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Course Name:</th>
              <th>Time Start:</th>
              <th>Time End:</th>
              <th>Day:</th>
              <th>Options:</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course =>
              <tr key={course.text}>
                <td>{course.text}</td>
                <td>{course.start}</td>
                <td>{course.end}</td>
                <td>{course.resource}</td>
                <td><button className='addButton'>Add</button></td>
              </tr>
            )}
          </tbody>
        </table>
        </TableScrollbar>
        </div>
        </div>
        </div>
      );
    }

   
    render() {
      let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : getAdminCourses.renderCoursesTable(this.state.courses, this.state.mycourses);
     /* let mycontents = this.state.loading
        ? <p><em>Loading...</em></p>
        : getTestData.renderMyCoursesTable(this.state.mycourses);*/
  
      return (
        <div className='studentPage'>
        <div style={styles.wrap}>
        <div>
          <h1 id="tabelLabel" >Welcome, Admin</h1>
          <p>Here is the list of courses.</p>
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