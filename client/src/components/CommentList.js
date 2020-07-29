import React, { useContext, useEffect, useState } from "react";
import { CommentContext } from "../providers/CommentProvider";
import { Comment } from "./Comment";
import { useParams, Link } from "react-router-dom";
import { ReviewContext } from "../providers/ReviewProvider";

export const CommentList = () => {
    const [review, setReview] = useState({})
    const { comments, getCommentsByReviewId } = useContext(CommentContext);
    const { getReview } = useContext(ReviewContext)
    const { id } = useParams()

    useEffect(() => {
        getCommentsByReviewId(id);
        getReview(id).then(setReview)
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    <Link to={`/reviews/${id}`}>
                        <button className="btn btn-secondary">Back to Review</button>
                    </Link>
                    <h2>Comments</h2>
                    <br />
                    <h3 className="review_comment">Review: {review.title}</h3>
                    {comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} reviewId={id} />
                    ))}
                </div>
            </div>
        </div>
    );
};
