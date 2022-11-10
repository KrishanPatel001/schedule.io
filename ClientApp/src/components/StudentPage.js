import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import styled from 'styled-components';
import "../App.css"
import axios from 'axios';

/*styles for calendar*/
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

/*list of test courses*/
let courses = [
  {
    id: 1,
    text: "testCourse 1",
    start: "2023-01-15T09:30:00",
    end: "2023-01-15T10:40:00",
    barColor: "#fcb711",
    resource: "TH",
    instuctor:"Smith",
    room:"Wall 234",
    isOpen:"0"
  },
  {
    id: 2,
    text: "testCourse 2",
    start: "2023-01-15T09:30:00",
    end: "2023-01-15T10:00:00",
    barColor: "#f37021",
    resource: "M",
    instuctor:"Gilmore",
    room:"Wall 234",
    isOpen:"1"
  },
  {
    id: 3,
    text: "testCourse 3",
    start: "2023-01-15T10:00:00",
    end: "2023-01-15T11:00:00",
    barColor: "#cc004c",
    resource: "M",
    instuctor:"Smith",
    room:"Wall 234",
    isOpen:"1"
  },
  {
    id: 4,
    text: "testCourse 4",
    start: "2023-01-15T11:00:00",
    end: "2023-01-15T12:00:00",
    barColor: "#6460aa",
    resource: "W",
    instuctor:"Gilmore",
    room:"Wall 234",
    isOpen:"1"
  },
  {
    id: 5,
    text: "testCourse 5",
    start: "2023-01-15T13:00:00",
    end: "2023-01-15T14:00:00",
    resource: "F",
    instuctor:"Jones",
    room:"Wall 234",
    isOpen:"1"
  },
  {
    id: 6,
    text: "testCourse 6",
    start: "2023-01-15T12:30:00",
    end: "2023-01-15T15:30:00",
    barColor: "#f1c232",
    resource: "TU",
    instuctor:"Gilmore",
    room:"Wall 234",
    isOpen:"1"

  },
];

export class StudentSchedule extends Component {
  constructor(props) {
    super(props);

    this.calendarRef = React.createRef();

    this.state = {
      viewType: "Resources",
      durationBarVisible: false,
    }

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
  
      //const events = [
        let events = [
        {
          id: 1,
          text: "testCourse 1",
          start: "2023-01-15T09:25:00",
          end: "2023-01-15T10:40:00",
          barColor: "#fcb711",
          resource: "TH"
        },
        {
          id: 2,
          text: "testCourse 2",
          start: "2023-01-15T09:30:00",
          end: "2023-01-15T10:00:00",
          barColor: "#f37021",
          resource: "M"
        },
        {
          id: 3,
          text: "testCourse 3",
          start: "2023-01-15T10:00:00",
          end: "2023-01-15T11:00:00",
          barColor: "#cc004c",
          resource: "M"
        },
        {
          id: 4,
          text: "testCourse 4",
          start: "2023-01-15T11:00:00",
          end: "2023-01-15T12:00:00",
          barColor: "#6460aa",
          resource: "W"
        },
        {
          id: 5,
          text: "testCourse 5",
          start: "2023-01-15T13:00:00",
          end: "2023-01-15T14:00:00",
          resource: "F"
        },
        {
          id: 6,
          text: "testCourse 6",
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
      <div className='studentPage'>
      <div style={styles.wrap}>
        <div style={styles.left}>

          <div className="container">
            <h3 className="p-3 text-center">Spring&nbsp;2023&nbsp;Courses</h3>
            <p className="p-3 text-center">Add search bar here</p>
            <Container>
              <List>
                {courses.map(course => <Card key={course.id}>
                  {course.text}&nbsp;<br></br>
                  Day:&nbsp;{course.resource}&nbsp;<br></br>
                  Time:&nbsp;{course.start}<br></br>
                 <button className='addButton'>Add</button>

                  </Card>)}
              </List>
            </Container>
          </div>
        </div>
        
        <div className="calendar">
          <div style={styles.main}>
             <DayPilotCalendar
              {...config}
              {...this.state}
              ref={this.calendarRef}
            />
          </div>
        </div>
    </div>
    </div>
    );
  }

}

export default StudentSchedule;