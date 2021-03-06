import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { FavoritePostContext } from "../providers/FavoritePostProvider";
import { FavoritePost } from "./FavoritePost";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Label } from "reactstrap";

import FavoritePostSearch from "./FavoritePostSearch";

export const FavoritePostList = () => {

    const { favoritePosts, getAllFavoritePosts, addFavoritePost} = useContext(FavoritePostContext);
    const [favoritePostInput, setInput] = useState(false)
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    const title = useRef('title')


    useEffect(() => {
        getAllFavoritePosts();
    }, []);

    const constructNewFavoritePost = () => {
        addFavoritePost({
            title: title.current.value,
            createDateTime: new Date(),
            userProfileId: userProfile.id,
        })
    }

    const displayInput = () => {
        if (favoritePostInput === true) {
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
                    <div className="saveFavoritePostBtn">
                        <button type="submit"
                            onClick={
                                evt => {
                                    evt.preventDefault()
                                    constructNewFavoritePost()
                                    setInput(false)
                                }}
                            className="btn btn-primary">
                            Save FavoritePost</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <section>
            <div className="row justify-content-center"></div>
              <div>
                <div className="addFavoritePostBtn">
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
            <div className="addFavoritePostStyle">
                {displayInput()}
            </div>
            <div className="cards-column">
                        <FavoritePostSearch/>
                        {favoritePosts.map((favoritePost) => (
                            <FavoritePost key={favoritePost.id} favoritePost={favoritePost} />
                        ))}
                    </div>
        </section>
    );
};
