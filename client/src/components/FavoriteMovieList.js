import React, { useContext, useEffect, useState } from "react";
import { FavoriteMovieContext } from "../providers/FavoriteMovieProvider";
import { FavoriteMovie } from "./FavoriteMovie";
import { useParams, Link } from "react-router-dom";
import { FavoritePostContext } from "../providers/FavoritePostProvider";
import { FavoriteMovieForm } from "./FavoriteMovieForm";
import { Button } from "reactstrap";

export const FavoriteMovieList = () => {
    const [favoritePost, setFavoritePost] = useState({})
    const { getFavoritePost } = useContext(FavoritePostContext)

    const { favoriteMovies, getFavoriteMoviesByFavoritePostId } = useContext(FavoriteMovieContext);

    const [favoriteMovieInput, setInput] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        getFavoriteMoviesByFavoritePostId(id);
        getFavoritePost(id).then(setFavoritePost)
    }, [])

    const displayInput = () => {
        if (favoriteMovieInput === true) {
          return <FavoriteMovieForm favoritePostId={id} />
        }
      }

    return (
        <div className="container">
            <div className="row justify-content-center">
            <Button type="submit"
              color="primary"
              onClick={
                evt => {
                  evt.preventDefault()
                  setInput(true)
                }
              }
              className="addFavoriteMovieBtn">
              Add FavoriteMovie
            </Button>   
          <div>
            {displayInput()}
          </div>
                <div className="cards-column">

                    <Link to={`/favoritePosts`}>
                        <button className="btn btn-secondary">Back to Favorite Post</button>
                    </Link>
                    <h2>FavoriteMovies</h2>
                    <br />
                    {/* <h3 className="favoritePost_favoriteMovie">FavoritePost: {favoritePost.title}</h3> */}
                    {favoriteMovies.map((favoriteMovie) => (
                        <FavoriteMovie key={favoriteMovie.id} favoriteMovie={favoriteMovie} favoritePostId={id} />
                    ))}
                    
                </div>
            </div>
        </div>
    );
};
