import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ReviewContext = React.createContext();

export const ReviewProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [reviews, setReviews] = useState([]);

    const apiUrl = '/api/review'

    const getAllReviews = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
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
            }).then(resp => resp.json()).then(getAllReviews))
    };

    const updateReview = (review) => {
        return getToken().then((token) =>
        fetch(`/api/review/${review.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
        }).then(getAllReviews));

    }

    const deleteReview = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(getAllReviews);
    }

    const getReview = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const searchReviews = searchTerm => {
        return getToken().then((token) =>
        fetch(`/api/review/search?q=${searchTerm}&sortDesc=true`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json().then(setReviews)));
      };

    return (
        <ReviewContext.Provider value={{
            reviews, getAllReviews, addReview, deleteReview, getReview, updateReview, searchReviews
        }}>
            {props.children}
        </ReviewContext.Provider>
    );
};
