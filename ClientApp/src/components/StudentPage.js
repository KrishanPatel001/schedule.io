import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "../App.css"


const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "30px"
  },
  main: {
    flexGrow: "1"
  }
};

export class StudentSchedule extends Component {
  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();

    this.state = {
      viewType: "Resources",
      durationBarVisible: false,
    }
      //startDate: "2022-11-07",
     /* columns: [
            {name: "Sunday", id: "SU"},
            {name: "Monday", id: "M"},
            {name: "Tuesday", id: "TU"},
            {name: "Wednesday", id: "W"},
            {name: "Thursday", id: "TH"},
            {name: "Friday", id: "F"},
            {name: "Saturday", id: "SA"},
      ]
    };*/
  }
  componentDidMount() {
    this.loadCalendarData();
  }

  loadCalendarData() {

    /*this doesnt matter but is necessary for program to work
    all courses need start: "2022-11-07T10:30:00",
    end: "2022-11-07T13:00:00" to show up with times adjustable*/
    const startDate = "2023-01-15";

        const columns = [
          {name: "Sunday", id: "SU"},
          {name: "Monday", id: "M"},
          {name: "Tuesday", id: "TU"},
          {name: "Wednesday", id: "W"},
          {name: "Thursday", id: "TH"},
          {name: "Friday", id: "F"},
          {name: "Saturday", id: "SA"},
      ];


    /*groupChanged(group) {

      const columns = group.resources;*/
  
      const events = [
        {
          id: 1,
          text: "testCourse 1 \n add course info here",
          start: "2023-01-15T09:25:00",
          end: "2023-01-15T10:40:00",
          barColor: "#fcb711",
          resource: "TH"
        },
        {
          id: 2,
          text: "testCourse 2 \n add course info here",
          start: "2023-01-15T09:00:00",
          end: "2023-01-15T10:00:00",
          barColor: "#f37021",
          resource: "M"
        },
        {
          id: 3,
          text: "testCourse 3 \n add course info here",
          start: "2023-01-15T10:00:00",
          end: "2023-01-15T11:00:00",
          barColor: "#cc004c",
          resource: "M"
        },
        {
          id: 4,
          text: "testCourse 4: \n add course info here",
          start: "2023-01-15T11:00:00",
          end: "2023-01-15T12:00:00",
          barColor: "#6460aa",
          resource: "W"
        },
        {
          id: 5,
          text: "testCourse 5 \n add course info here",
          start: "2023-01-15T13:00:00",
          end: "2023-01-15T14:00:00",
          resource: "F"
        },
        {
          id: 6,
          text: "testCourse 6\n add course info here",
          start: "2023-01-15T12:30:00",
          end: "2023-01-15T15:30:00",
          barColor: "#f1c232",
          resource: "TU"
        },
      ];
  
      this.calendar.update({startDate,columns, events});
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  render() {
    const {...config} = this.state;
    return (
      <div style={styles.wrap}>
      <div style={styles.left}>
        
        <h2>Spring&nbsp;2023&nbsp;Courses</h2>
        <p>Add courses to select from in sidebar here</p>
      </div>
      <div>
        <div style={styles.main}>
      <DayPilotCalendar
        {...config}
        {...this.state}
        ref={this.calendarRef}
      />
      </div>
      </div>
    </div>
    );
  }

}

export default StudentSchedule;