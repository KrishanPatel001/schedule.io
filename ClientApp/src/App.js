import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
<<<<<<< HEAD
import { Database } from './components/Database';
=======
import SignUpForm from "./components/SignUp";
import SignInForm from "./components/SignIn";
import SignIn from "./components/SignInPage";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
>>>>>>> Loki

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
<<<<<<< HEAD
        <Route path='/database' component={Database} />
=======
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/sign-in" component={SignIn} />
>>>>>>> Loki
      </Layout>
    );
  }
}

export default App;