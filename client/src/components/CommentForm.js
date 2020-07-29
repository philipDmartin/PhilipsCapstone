import React, { useContext, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { CommentContext } from '../providers/CommentProvider';

export const CommentForm = ({ reviewId }) => {
    const { addComment } = useContext(CommentContext)

    const content = useRef('content')
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const history = useHistory()

    const constructNewComment = () => {

        const newCommentObject = {
            content: content.current.value,
            createDateTime: new Date(),
            reviewId: parseInt(reviewId),
            userProfileId: userProfile.id,
        }

        console.log(newCommentObject)
        return addComment(newCommentObject)
    }

    return (
        <form className='commentForm'>
            <h2 className='commentForm__title'>New Comment</h2>
            <fieldset>
                <div className='form-group'>
                    <label htmlFor='commentContent'>Comment content: </label>
                    <input
                        type='textarea'
                        id='commentContent'
                        ref={content}
                        required
                        autoFocus
                        className='form-control'
                        placeholder='Comment content'
                    />
                </div>
            </fieldset>

            <button
                type='submit'
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewComment().then(p => history.push(`/comments/${reviewId}`))

                }}
                className='btn btn-primary'
            >
                Save Comment
      </button>
        </form>
    )
}