import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { ReviewList } from "./ReviewList";
import { UserReviewList } from "./UserReviewList";
import { EditReviewForm } from "./EditReviewForm";
import ReviewDetails from "./ReviewDetails";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import Login from "./Login";
import Register from "./Register";
import { Profile } from "./UserProfile";
import { FavoritePostList } from "./FavoritePostList";

export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <p>HI WELCOME TO MOO-V</p><Redirect to="/reviews" />
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

        <Route path='/reviews/update/:id' exact>
          <EditReviewForm />
        </Route>

        <Route path='/reviews/:id' exact>
          {isLoggedIn ? <ReviewDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comments/:id" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comments/add/:id" exact>
          {isLoggedIn ? <CommentForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/profile/:Id">
          {isLoggedIn ? <Profile /> : <Redirect to="/reviews" />}
        </Route>

        <Route path="/favoritePosts" exact>
          {isLoggedIn ? <FavoritePostList /> : <Redirect to="/login" />}
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
