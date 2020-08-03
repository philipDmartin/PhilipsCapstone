import React, { useContext, useRef, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FavoriteMovieContext } from '../providers/FavoriteMovieProvider';
import { ReviewContext } from '../providers/ReviewProvider'

export const FavoriteMovieForm = ({ favoritePostId }) => {
    const { addFavoriteMovie } = useContext(FavoriteMovieContext)

    const { reviews, getAllReviewsByUser, getReview } = useContext(ReviewContext)
    const [review, setReview] = useState({})

    const id = useRef('id')
    const why = useRef('why')
    const reviewId = useRef('reviewId')
    
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const history = useHistory()

    const constructNewFavoriteMovie = () => {
        const newFavoriteMovieObject = {
            why: why.current.value,
            reviewId: parseInt(reviewId.current.value),
            favoritePostId: parseInt(favoritePostId),
        }

        console.log(newFavoriteMovieObject)
        return addFavoriteMovie(newFavoriteMovieObject)
    }
// debugger
    useEffect(() => {
        getAllReviewsByUser();
          getReview(id).then(setReview)
      }, [])

    //   debugger
    return (
        <form className='favoriteMovieForm'>
            <h2 className='favoriteMovieForm__title'>New FavoriteMovie</h2>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='favoriteMovieContent'>FavoriteMovie why: </label>
                    <input Why
                        type='textarea'
                        id='favoriteMovieContent'
                        ref={why}
                        required
                        autoFocus
                        className='form-control'
                        placeholder='FavoriteMovie why'
                    />
                     
                </div>
            </fieldset>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='reviewId'>Assign Review: </label>
                    <select
                    defaultValue=''
                    name='reviewId'
                    ref={reviewId}
                    id='reviewId'
                    className='form-control'
                    placeholder='reviewId'
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
            </fieldset>

            <button
                type='submit'
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewFavoriteMovie()

                }}
                className='btn btn-primary'
            >
                Save FavoriteMovie
      </button>
        </form>
    )
}
