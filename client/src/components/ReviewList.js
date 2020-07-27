import React, { useContext, useEffect } from "react";
import { ReviewContext } from "../providers/ReviewProvider";
import { Review } from "./Review";

export const ReviewList = () => {

    const { reviews, getAllReviews } = useContext(ReviewContext);

    useEffect(() => {
        getAllReviews();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {reviews.map((review) => (
                        <Review key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
};
