import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [comments, setComments] = useState([]);

    const apiUrl = '/api/comment'

    const getCommentsByReviewId = (id) => {
        getToken().then((token) =>
            fetch(apiUrl + `/getbyreview/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setComments));
    };

    const getComment = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const addComment = (comment) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            }).then(resp => resp.json()))
    };

    const updateComment = (comment) => {

        return getToken().then((token) =>
            fetch(apiUrl + `/${comment.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            })).then(() => getCommentsByReviewId(comment.reviewId))
    }

    const deleteComment = (comment) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${comment.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(() => getCommentsByReviewId(comment.reviewId))
    };

    return (
        <CommentContext.Provider value={{
            comments, getCommentsByReviewId, getComment, addComment, updateComment, deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    );
};