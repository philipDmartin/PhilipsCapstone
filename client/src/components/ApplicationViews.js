import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ReviewList } from "./ReviewList";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <main>
      <Switch>
        {/* <Route path="/" exact>
          <p>HI</p><Redirect to="/" />
        </Route> */}

        <Route path="/" exact>
          {isLoggedIn ? <Login /> : <Redirect to="/login" />}
        </Route>

        <Route path="/reviews" exact>
          {isLoggedIn ? <ReviewList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
