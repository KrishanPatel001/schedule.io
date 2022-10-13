import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "../App.css"
//import {ResourceGroups} from "./ResourceGroups";

export class StudentSchedule extends Component {
  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();

    this.state = {
      viewType: "Resources",
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

    const startDate = "2022-11-07";

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
          text: "testCourse 1",
          start: "2022-11-07T10:30:00",
          end: "2022-11-07T13:00:00",
          barColor: "#fcb711",
          resource: "TH"
        },
        {
          id: 2,
          text: "testCourse 2",
          start: "2022-11-07T09:30:00",
          end: "2022-11-07T11:30:00",
          barColor: "#f37021",
          resource: "M"
        },
        {
          id: 3,
          text: "testCourse 3",
          start: "2022-11-07T12:00:00",
          end: "2022-11-07T15:00:00",
          barColor: "#cc004c",
          resource: "M"
        },
        {
          id: 4,
          text: "testCourse 4",
          start: "2022-11-07T11:30:00",
          end: "2022-11-07T14:30:00",
          barColor: "#6460aa",
          resource: "W"
        },
        {
          id: 5,
          text: "testCourse 5",
          start: "2022-11-07T10:00:00",
          end: "2022-11-07T13:30:00",
          resource: "F"
        },
        {
          id: 6,
          text: "testCourse 6",
          start: "2022-11-07T12:30:00",
          end: "2022-11-07T15:30:00",
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
    return (
      <DayPilotCalendar
        {...this.state}
        ref={this.calendarRef}

      />
    );
  }

}

export default StudentSchedule;