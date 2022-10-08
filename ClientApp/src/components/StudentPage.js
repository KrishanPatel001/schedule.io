import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import {DayPilot, DayPilotCalendar} from "@daypilot/daypilot-lite-react";

import "../App.css";


export class StudentSchedule extends Component {
    //displayName = StudentSchedule.name;
    //displayName="Student Name";

    constructor(props) {
      super(props);

      this.state = {
        viewType: "Week"
        //durationBarVisible: false
      };

      this.student={
        name:"",
        id:"",
        major:""
      };
      //get from sign in
      this.student.name="Student Name"

      this.Course={
        courseName:"",
        courseNum:"",
        courseDay:"",
        courseTime:"",
        courseProfessor:""
      }
      //will get this from database
      this.Course.courseName="CSCI"
      this.Course.courseNum="101"
      this.Course.courseDay="Tu/Th"
      this.Course.courseTime="10:50-12:05"
      this.Course.courseProfessor  ="A. Gilmore"
      };


    render() {
      const {...config} = this.state;
      return (
        <div className='app'>
        <div>
          <h1>Welcome, {this.student.name}</h1>
          <p>display all courses and a calandar to show courses</p>
          <div>
        <DayPilotCalendar 
         {...config}
         />
      </div>
      </div>
        </div>
      );
    }
}
  export default StudentSchedule;