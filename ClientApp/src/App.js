import React from 'react';
import { Layout } from './components/Layout';
import Home from './components/Home';
import { FetchData } from './components/FetchData';
import SignUpForm from "./components/SignUp";
import SignIn from "./components/SignInPage";
<<<<<<< HEAD
import SignInForm from "./components/SignIn";
=======
import { StudentSchedule } from './components/StudentPage';
>>>>>>> Student
import { HashRouter as Router, Route, NavLink } from "react-router-dom";

import './custom.css'
import "./App.css";

export default function App() {  
    return (
      <Layout>
        <Route path='/' exact component ={Home}/>
        <Route path='/' exact component={SignIn}/>
        <Route path='/fetch-data' component={FetchData} />
        <Route path="/sign-up" component={SignUpForm} />
<<<<<<< HEAD
        <Route path="/sign-in" component={SignInForm} />
=======
        <Route path="/sign-in" component={SignIn} />
        <Route path="/Student-page" component={StudentSchedule} />
>>>>>>> Student
      </Layout>
    );
}