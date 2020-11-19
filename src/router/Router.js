import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
// Components
import Login from "../components/login/Login";
import Main from "../components/main/Main";
import Video from "../components/video/Video";


/**
 * Raoutes of App
 */
const Routes = () => {
  return (
    <BrowserRouter>
      <div>
          <Switch>
            <Route path='/' component={Login} exact />
            <Route path='/main' component={Main} exact />
            <Route path='/video/:id' component={Video} exact />
            <Route component={Login} />
          </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Routes;
