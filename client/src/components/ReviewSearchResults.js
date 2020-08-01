import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReviewContext } from "../providers/ReviewProvider";

export const SearchResults = ({ searchTerms }) => {
  const { reviews } = useContext(ReviewContext);
  const [filteredReview, setFiltered] = useState([]);

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = reviews.filter((review) =>
        review.reviewUserProfiles.some(pt => pt.userProfile.displayName.toLowerCase().includes(searchTerms))
      );
      setFiltered(subset);
    } else {
      setFiltered([]);
    }
  }, [searchTerms, reviews]);

  return (
    <div className="searchResults">
      <div className="searchList">
        {filteredReview.map((review) => (
          <Link key={review.id} to={`/review/${review.id}`}><strong>  {review.title}</strong></Link>
        ))}
      </div>
    </div>
  );
};
