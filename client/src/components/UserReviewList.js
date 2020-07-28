import React, { useContext, useEffect } from "react";
import { UserReview } from "./UserReview";
import { UserReviewContext } from "../providers/UserReviewProvider";

export const UserReviewList = () => {
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const { userReviews, getAllReviewsByUser } = useContext(UserReviewContext);

    useEffect(() => {
        getAllReviewsByUser(userProfile.id)
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {userReviews.map((review) => (
                        <UserReview key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
};
