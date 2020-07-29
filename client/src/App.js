import React from 'react';
import logo from './logo.svg';
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import ApplicationViews from "./components/ApplicationViews";
import { CommentProvider } from './providers/CommentProvider';
import { ReviewProvider } from './providers/ReviewProvider';
import { UserReviewProvider } from './providers/UserReviewProvider';
import { UserTypeProvider } from './providers/UserTypeProvider.js';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <UserTypeProvider>
          <ReviewProvider>
            <UserReviewProvider>
              <CommentProvider>
                <Header />
                <ApplicationViews />
              </CommentProvider>
            </UserReviewProvider>
          </ReviewProvider>
        </UserTypeProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
