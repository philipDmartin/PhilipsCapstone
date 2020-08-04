import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const UserReviewContext = React.createContext();

export const UserReviewProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [userReviews, setReviews] = useState([]);

    const apiUrl = '/api/review'

    const getAllReviewsByUser = () => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbyuser`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setReviews));
    };

    const addReview = (review) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(review)
            }).then(resp => resp.json())
                .then(getAllReviewsByUser))
    };

    const deleteReview = (review) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${review.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(() => getAllReviewsByUser(review.userProfile.id))
    }

    return (
        <UserReviewContext.Provider value={{
            userReviews, getAllReviewsByUser, addReview, deleteReview
        }}>
            {props.children}
        </UserReviewContext.Provider>
    );
};
