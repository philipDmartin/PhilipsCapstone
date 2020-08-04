import React, { useContext, useEffect, useState, useRef } from "react";
import { ReviewContext } from "../providers/ReviewProvider";
import { Review } from "./Review";
import ReviewSearch from "./ReviewSearch";

export const ReviewList = () => {

    const { reviews, getAllReviews, addReview} = useContext(ReviewContext);
    const [reviewInput, setInput] = useState(false)
    
    const title = useRef('title')
    const content = useRef('content')
    const stars = useRef('stars')
    const category = useRef('category')
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const imageLocation = useRef('imageLocation')

    useEffect(() => {
        getAllReviews();
    }, []);

    const constructNewReview = () => {
        addReview({
            title: title.current.value,
            content: content.current.value,
            stars: stars.current.value,
            createDateTime: new Date(),
            category: (category.current.value),
            userProfileId: userProfile.id,
            imageLocation: imageLocation.current.value,
        })
    }

    const displayInput = () => {
        if (reviewInput === true) {
            return (
                <div className="form-group">
                    <input
                        type="text"
                        id="title"
                        ref={title}
                        required
                        className="form-control"
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        id="content"
                        ref={content}
                        required
                        className="form-control"
                        placeholder="Content"
                    />
                    <input
                        type="text"
                        id="stars"
                        ref={stars}
                        required
                        className="form-control"
                        placeholder="Stars"
                    />
                    <input
                        type="text"
                        id="category"
                        ref={category}
                        required
                        className="form-control"
                        placeholder="Category"
                    />
                    <input
                        type="text"
                        id="imageLocation"
                        ref={imageLocation}
                        required
                        className="form-control"
                        placeholder="ImageUrl"
                    />
                    <div className="saveReviewBtn">
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    constructNewReview()
                                    setInput(false)
                                }}
                            className="btn btn-primary">
                            Save Review</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <section>
            <div className="row justify-content-center"></div>
                <div>
                    <div className="addReviewBtn">
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    setInput(true)
                                }
                            }
                        className="btn btn-primary">
                        Add</button>
                    </div>
                </div>
                <br />
            <div className="addReviewStyle">
                {displayInput()}
            </div>
                <div className="cards-column">
                    <ReviewSearch/>
                    {reviews.map((review) => (
                        <Review key={review.id} review={review} />
                    ))}
                </div>
        </section>
    );
};
