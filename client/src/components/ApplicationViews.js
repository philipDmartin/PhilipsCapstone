import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ReviewList } from "./ReviewList";
import { UserReviewList } from "./UserReviewList";
import ReviewDetails from "./ReviewDetails";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <p>HI WELCOME TO MOO-V</p><Redirect to="/" />
        </Route>

        <Route path="/" exact>
          {isLoggedIn ? <Login /> : <Redirect to="/login" />}
        </Route>

        <Route path="/reviews" exact>
          {isLoggedIn ? <ReviewList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/userreviews" exact>
          {isLoggedIn ? <UserReviewList /> : <Redirect to="/login" />}
        </Route>

        <Route path='/reviews/:id' exact>
          {isLoggedIn ? <ReviewDetails /> : <Redirect to="/login" />}
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
