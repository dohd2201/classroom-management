import React, { Fragment, useState } from "react";
import UserList from "./userList/UserList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserCreate from "./userCreate/UserCreate";
import UserUpdate from "./userUpdate/UserUpdate";
import UserInfo from "./userInfo/UserInfo";

function User() {
  return (
    <Router>
      <Switch>
        <Route exact path="/users">
          <UserList />
        </Route>
        <Route exact path="/users/user/:id">
          <UserInfo />
        </Route>
        <Route exact path="/users/create-user">
          <UserCreate />
        </Route>
        <Route exact path="/users/user/update/:id">
          <UserUpdate />
        </Route>
      </Switch>
    </Router>
  );
}

export default User;
