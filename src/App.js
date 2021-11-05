import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Dashboard from "./modules/dashboard/Dashboard";
import User from "./modules/user/User";
import Classroom from "./modules/classroom/Classroom";
import ActiveUsers from "./modules/activeUsers/ActiveUsers";
import RegisterForm from "./components/registerForm/RegisterForm";
import Success from "./components/success/Success";
function App() {
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <div className={'container'}>
            <Sidebar />
            <Dashboard />
          </div>
        </Route>
        <Route path="/dashboard">
          <div className={'container'}>
            <Sidebar />
            <Dashboard />
          </div>
        </Route>
        <Route path="/users">
          <div className={'container'}>
            <Sidebar />
            <User />
          </div>
        </Route>
        <Route path="/classrooms">
          <div className={'container'}>
            <Sidebar />
            <Classroom />
          </div>
        </Route>
        <Route path="/takeCare">
          <div className={'container'}>
            <Sidebar />
            <TakeCare />
          </div>
        </Route>
        <Route path="/activeUsers">
          <div className={'container'}>
            <Sidebar />
            <ActiveUsers />
          </div>
        </Route>
        <Route path="/signup">
          <UserForm type="public" />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
