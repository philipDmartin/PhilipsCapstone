import React, { useEffect, useContext, useState } from 'react'
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { ListGroupItem } from 'reactstrap'
import { ReviewContext } from '../providers/ReviewProvider'
import { useParams, Link, useHistory } from 'react-router-dom'
// import { CommentForm } from './CommentForm';
import { format } from 'date-fns'

const ReviewDetails = () => {
const [review, setReview] = useState()
//   const [commentInput, setInput] = useState(false)
  const { getReview } = useContext(ReviewContext);
  const { id } = useParams()
  const history = useHistory();
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  useEffect(() => {
    getReview(id).then(setReview)
  }, [])

//   const displayInput = () => {
//     if (commentInput === true) {
//       return <CommentForm reviewId={id} />
//     }
//   }

//   const ViewComments = () => {
//     return history.push(`/comments/${id}`)
//   }

//   const ManageTags = () => {
//     return history.push(`/AddTagForm/review/${review.id}`)
//   }

  if (!review) {
    return null
  }

  return (
    <div className='row justify-content-center'>
      <div className='col-sm-12 col-lg-6'>
        <div className="backLink">
          {
            (review.userProfileId === userProfile.id)
              ? <Link className="backLink" to={'/userreviews'}><Button className="backBtn secondary">Back to My Reviews</Button></Link>
              : <Link className="backLink" to={'/reviews'}><Button className="backBtn secondary">Back to All Reviews</Button></Link>
          }
        </div>
        <Card className="m-4 reviewDetails">
          <CardImg className="reviewImg" top src={review.imageLocation} />
          <CardBody>
            <div className="reviewTitle">
              <h3>{review.title}</h3>
            </div>

            <div className="reviewItems">
              Content: <br />
              {review.content} <br /><br />
              <div>
                Reviewed by: <br />
                {review.userProfile.displayName} <br />
              </div>
              <div>
                Stars: <br />
                {review.stars} <br />
              </div>
              <div>
                Category: <br />
                {review.category} <br /><br />
              </div>
              <div>
                Date Published: <br />
                {format(new Date(review.createDateTime), 'MM/dd/yyyy')} <br /><br />
              </div>
            </div>
            {/* <div className="reviewTags">
              {
                (review.userProfileId === userProfile.id)
                  ? <Button className="mngTagBtn"
                    color="info"
                    onClick={
                      evt => {
                        evt.preventDefault()
                        ManageTags()
                      }
                    }>Manage Tags
                  </Button>
                  : ""
              }
              <div></div>
              <ListGroupItem className="reviewTagList"><div className="reviewTags"> <strong>Tags: </strong>  {review.reviewTags.map(pt => <TagsOnReview key={pt.id} reviewTag={pt} />)}</div></ListGroupItem>
              <div></div>
            </div> */}
          </CardBody>

          {/* <div className="commentBtns">
            <Button className="viewCommentBtn" color="secondary"
              onClick={
                evt => {
                  evt.preventDefault()
                  ViewComments()
                }
              }>View Comments
            </Button> */}

            {/* <Button type="submit"
              color="primary"
              onClick={
                evt => {
                  evt.preventDefault()
                  setInput(true)
                }
              }
              className="addCommentBtn">
              Add Comment
            </Button> */}
          {/* </div> */}

          {/* <div>
            {displayInput()}
          </div> */}
        </Card>
      </div>
    </div>
  )
}

export default ReviewDetails
