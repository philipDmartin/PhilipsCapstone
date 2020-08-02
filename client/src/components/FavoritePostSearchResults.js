import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FavoritePostContext } from "../providers/FavoritePostProvider";

export const SearchResults = ({ searchTerms }) => {
  const { favoritePosts } = useContext(FavoritePostContext);
  const [filteredFavoritePost, setFiltered] = useState([]);

  useEffect(() => {
    if (searchTerms !== "") {
      const subset = favoritePosts.filter((favoritePost) =>
        favoritePost.favoritePostUserProfiles.some(pt => pt.userProfile.displayName.toLowerCase().includes(searchTerms))
      );
      setFiltered(subset);
    } else {
      setFiltered([]);
    }
  }, [searchTerms, favoritePosts]);

  return (
    <div className="searchResults">
      <div className="searchList">
        {filteredFavoritePost.map((favoritePost) => (
          <Link key={favoritePost.id} to={`/favoritePost/${favoritePost.id}`}><strong>  {favoritePost.title}</strong></Link>
        ))}
      </div>
    </div>
  );
};
