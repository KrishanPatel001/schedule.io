import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import SignUpForm from "./components/SignUp";
import SignInForm from "./components/SignIn";
import SignIn from "./components/SignInPage";
import { StudentSchedule } from './components/StudentPage';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import './custom.css'
import "./App.css";

export class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/Student-page" component={StudentSchedule} />
      </Layout>
    );
  }
}

export default App;