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
      this.state = {courses: [], mycourses: [], articles: [], loading: false}; 


    }
     
    componentDidMount() {
      this.getCourseData();
      this.getMyCourseData();
        }

   static renderCoursesTable(courses,mycourses){
      return (
        <div className='studentPage'>
        <div style={styles.wrap}>
          <div style={styles.left}>
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
        <div className="mycoursesTable">
        <p className='p-3 text-center'>Your course schedule:</p>
        <table className='table table gold' aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Course Name:</th>
          <th>Time Start:</th>
          <th>Time End:</th>
          <th>Day:</th>
          <th>Options:</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {mycourses.map(mycourse =>
              <tr key={mycourses.Id}>
                <td>{mycourse.course1}</td>
                <td>{mycourse.course2}</td>
                <td>{mycourse.course3}</td>
                <td>{mycourse.course4}</td>
                <td>{mycourse.course5}</td>
                <td><button className='addButton'>Drop Course</button></td>
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
           this.setState({ courses: data, loading: false });
           
         }

    async getMyCourseData(){
        // axios
        axios.get('/mycourses')
        .then(response => {
            console.log(response.data);
            const data = response.json();
            this.setState({ courses: data, loading:false });
          }, error => {
            console.log(error);
          });

                  }

}