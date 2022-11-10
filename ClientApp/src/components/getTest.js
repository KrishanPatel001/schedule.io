import React, {Component} from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import "../App.css"
import axios from 'axios';

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

const Card = styled.div`
  margin: 10px;
  color: #12130f;
  background: #fff;
  height: 125px;
  width: 250px;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-flow: column; 
  justify-content: center;
  align-items: center;
`;

export class getTestData extends Component {

    constructor(props) {
      super(props);
      this.state = {courses: [], loading: false }; 
    }

   /* getCourseData() {
        let courses= axios({
             method: "get",
             url: "/course",
           }).then(function (response) {
             console.log(response.data);
             setData(response.courses);
              console.log(data)
           });
         }*/
    
  
    componentDidMount() {
      this.getCourseData();
        }
  
   // static renderCoursesTable(courses) {
   static renderCoursesTable(courses){
      return (
            <div className="container">
            <h3 className="p-3 text-center">Spring&nbsp;2023&nbsp;Courses</h3>
        <table className='table table-striped gold' aria-labelledby="tabelLabel">
          <thead>
            <tr>
              <th>Course Name:</th>
              <th>Time Start:</th>
              <th>Time End:</th>
              <th>resource:</th>
              <th>Id:</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course =>
              <tr key={course.text}>
                <td>{course.text}</td>
                <td>{course.start}</td>
                <td>{course.end}</td>
                <td>{course.resource}</td>
                <td>{course.id}</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      );
    }
  
    render() {
      let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : getTestData.renderCoursesTable(this.state.courses);
  
      return (
        <div>
          <h1 id="tabelLabel" >Welcome, Student</h1>
          <p>View and Edit your course schedule below</p>
          {contents}
        </div>
      );
    }
    async  getCourseData() {
       /* const data = axios({
             method: "get",
             url: "/course",
           }).then(function (response) {
             console.log(response.data);
           });*/
           const response = await fetch('/course');
            const data = await response.json();
           this.setState({ courses: data, loading: false });
         }
         //to get individual students courses
         //need To add table to database that keeps track of which courses students
         //are signed up for.
    /*async getMyCourseData(){
        const response = await fetch('/course');
        const data = await response.json();
       this.setState({ courses: data, loading: false });
     }*/
  
}