import React, { useContext, useState, useEffect, useRef } from "react";
import { FavoriteMovieContext } from "../providers/FavoriteMovieProvider";
import { Button, Form } from "reactstrap";
import { useHistory } from "react-router-dom";
import { ReviewContext } from "../providers/ReviewProvider";

export const EditFavoriteMovieForm = ({favoriteMovie, toggle, toggleEdit}) => {

  const { updateFavoriteMovie } = useContext(FavoriteMovieContext)
  const { reviews, getAllReviewsByUser } = useContext(ReviewContext)

  const [profileUpdate, setFavoriteMovie] = useState([favoriteMovie]);
  const history = useHistory();
  
  const why = useRef('why')
  const review = useRef('review')
  const id = useRef('id')

  const handleControlledInputChange = (event) => {
    const newFavoriteMovie = Object.assign({}, profileUpdate);
    newFavoriteMovie[event.target.name] = event.target.value;
    setFavoriteMovie(newFavoriteMovie);
  };

  //  const editFavoriteMovie = (favoriteMovie) => {
  //       return updateFavoriteMovie({
  //           id: parseInt(favoriteMovie.id),
  //           why: why.current.value,
  //           review: favoriteMovie.review,
  //           FavoritePostId: favoriteMovie.FavoritePostId,
  //           userProfileId: favoriteMovie.favoritePost.userProfile.id,
  //           createDateTime: favoriteMovie.favoritePost.createDateTime
  //       }).then(toggleEdit)
  //   }

  const editFavoriteMovie = () => {
    updateFavoriteMovie(profileUpdate).then(toggle).then(history.push(`/favoriteMovies/${favoriteMovie.id}`));
  };

  useEffect(() => {
    getAllReviewsByUser();
  }, [])
//   debugger
  return (
    <>
      <Form className="editFavoriteMovieForm">
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">
              Why:
              <input
                    type="text"
                    id="why"
                    ref={why}
                    required
                    autoFocus
                    className="form-control"
                    defaultValue={favoriteMovie.why}
                    onChange={handleControlledInputChange}

                />
                <br />
                <div className='form-group'>
                    <label htmlFor='review'>Assign Review: </label>
                    <select
                    defaultValue=''
                    onChange={handleControlledInputChange}
                    name='review'
                    ref={review}
                    id='review'
                    className='form-control'
                    placeholder='review'
                    required
                    autoFocus
                    >
                    <option value='0'>Select a Review</option>
                    {reviews.map(r => (
                        <option key={r.id} value={r.id}>
                        {r.title}
                        </option>
                    ))}
                    </select>
                </div>
                <br />
            </label>
          </div>
        </fieldset>

        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            editFavoriteMovie();
          }}
        >
          Save Updates
        </Button>
        <Button onClick={toggle}>Cancel</Button>
      </Form>
    </>
  );
};
