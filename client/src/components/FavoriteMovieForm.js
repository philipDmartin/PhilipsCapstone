import React, { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { FavoriteMovieContext } from '../providers/FavoriteMovieProvider';

export const FavoriteMovieForm = ({ favoritePostId }) => {
    const { addFavoriteMovie } = useContext(FavoriteMovieContext)

    const why = useRef('why')
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const history = useHistory()

    const constructNewFavoriteMovie = () => {

        const newFavoriteMovieObject = {
            why: why.current.value,
            createDateTime: new Date(),
            favoritePostId: parseInt(favoritePostId),
            userProfileId: userProfile.id,
        }

        console.log(newFavoriteMovieObject)
        return addFavoriteMovie(newFavoriteMovieObject)
    }

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

            <button
                type='submit'
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewFavoriteMovie().then(p => history.push(`/favoriteMovies/${favoritePostId}`))

                }}
                className='btn btn-primary'
            >
                Save FavoriteMovie
      </button>
        </form>
    )
}
