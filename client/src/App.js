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
import { FavoritePostProvider } from './providers/FavoritePostProvider.js';
import { FavoriteMovieProvider } from './providers/FavoriteMovieProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <UserTypeProvider>
          <ReviewProvider>
            <UserReviewProvider>
              <CommentProvider>
                <FavoritePostProvider>
                  <FavoriteMovieProvider>
                    <Header />
                    <ApplicationViews />
                    </FavoriteMovieProvider>
                  </FavoritePostProvider>
              </CommentProvider>
            </UserReviewProvider>
          </ReviewProvider>
        </UserTypeProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
