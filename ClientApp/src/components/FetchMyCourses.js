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

export class FetchMyCourses extends Component {

    constructor(props) {
      super(props);
      this.state = { mycourses: [], loading: false}; 


    }
     
    componentDidMount() {
      this.FetchMyCourseData();
        }

        static renderMyCoursesTable(mycourses){
          return (
            <div className='studentPage'>
            <div style={styles.wrap}>
            <div className="mycoursesTable">
            <p className='p-3 text-center'>View your course schedule below</p>
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
        : FetchMyCourses.renderMyCoursesTable(this.state.mycourses);
  
      return (
        <div className='studentPage'>
        <div style={styles.wrap}>
        <div>
          {contents}
        </div>
       </div>
       </div>
      );
    }

       async FetchMyCourseData(){
        const response = await fetch('/mycourse');
        const data = await response.json();
        this.setState({ mycourses: data, loading: false });
        }
}