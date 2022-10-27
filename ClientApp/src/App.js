import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import SignUpForm from "./components/SignUp";
import SignIn from "./components/SignInPage";
import SignInForm from "./components/SignIn";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import './custom.css'
import "./App.css";


function App() {  
    return (
      <Layout>
        <Route component={SignIn}/>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path="/sign-up" component={SignUpForm} />
        <Route path="/sign-in" component={SignInForm} />
      </Layout>
    );
}

export default App;