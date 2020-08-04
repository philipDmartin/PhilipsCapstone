import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const FavoriteMovieContext = React.createContext();

export const FavoriteMovieProvider = (props) => {
    const { getToken } = useContext(UserProfileContext)
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const apiUrl = '/api/favoriteMovie'

    const getFavoriteMoviesByFavoritePostId = (id) => {
        
        return getToken().then((token) =>
            fetch(apiUrl + `/getbyfavoritePost/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })).then(resp => resp.json()).then(setFavoriteMovies)
    };

    const getFavoriteMovie = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const addFavoriteMovie = (favoriteMovie) => {
        
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(favoriteMovie)
            }).then(resp => resp.json()).then( () => getFavoriteMoviesByFavoritePostId(favoriteMovie.favoritePostId)))
    };

    const updateFavoriteMovie = (favoriteMovie) => {
// debugger
        return getToken().then((token) =>
            fetch(apiUrl + `/${favoriteMovie.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(favoriteMovie)
            })).then(() => getFavoriteMoviesByFavoritePostId(favoriteMovie.favoritePostId))
    }

    const deleteFavoriteMovie = (favoriteMovie) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${favoriteMovie.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })).then( () => getFavoriteMoviesByFavoritePostId(favoriteMovie.favoritePostId))
    };

    const getAllFavoriteMoviesByUser = () => {
        return getToken().then((token) =>
            fetch(apiUrl + `/getbyuser`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setFavoriteMovies));
    };

    return (
        <FavoriteMovieContext.Provider value={{
            favoriteMovies, getFavoriteMoviesByFavoritePostId, getFavoriteMovie, addFavoriteMovie, updateFavoriteMovie, deleteFavoriteMovie, getAllFavoriteMoviesByUser
        }}>
            {props.children}
        </FavoriteMovieContext.Provider>
    );
};
