import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FavoritePostContext = React.createContext();

export const FavoritePostProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [favoritePosts, setFavoritePosts] = useState([]);

    const apiUrl = '/api/favoritePost'

    const getAllFavoritePosts = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then(resp => resp.json())
                .then(setFavoritePosts));
    };

    const addFavoritePost = (favoritePost) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(favoritePost)
            }).then(resp => resp.json()).then(getAllFavoritePosts))
    };

    const updateFavoritePost = (favoritePost) => {
        return getToken().then((token) =>
        fetch(`/api/favoritePost/${favoritePost.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favoritePost),
        }).then(getAllFavoritePosts));

    }

    const deleteFavoritePost = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then(getAllFavoritePosts);
    }

    const getFavoritePost = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    return (
        <FavoritePostContext.Provider value={{
            favoritePosts, getAllFavoritePosts, addFavoritePost, deleteFavoritePost, getFavoritePost, updateFavoritePost
        }}>
            {props.children}
        </FavoritePostContext.Provider>
    );
};