import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { FavoritePostContext } from "../providers/FavoritePostProvider";
import { FavoritePost } from "./FavoritePost";

import { UserProfileContext } from "../providers/UserProfileProvider";
import { Label } from "reactstrap";

import { SearchBar } from "./FavoritePostSearchBar"
import { SearchResults } from "./FavoritePostSearchResults"

export const FavoritePostList = () => {

    const { favoritePosts, getAllFavoritePosts, addFavoritePost, filterfavoritePostsByUserProfile} = useContext(FavoritePostContext);
    const { getUserProfiles, userProfiles } = useContext(UserProfileContext);
    const [favoritePostInput, setInput] = useState(false)

    const [searchTerms, setTerms] = useState(null);

    const title = useRef('title')
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const history = useHistory()

    useEffect(() => {
        getAllFavoritePosts();
    }, []);

    useEffect(() => {
        getUserProfiles();
      }, []);

      const handleUserProfileChange = (e) => {
        e.preventDefault();
    
        const criterion = +e.target.value
        const approved = true
        filterfavoritePostsByUserProfile(criterion, approved);
      };

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
             <div className="row justify-content-center">
            <div className="reviewList">
                <SearchBar setTerms={setTerms} />
                <SearchResults searchTerms={searchTerms} />
                <div className="filterContainer">
                {/* <Label for="content">Filter by UserProfile</Label>
                <select required onChange={handleUserProfileChange}>
                    <option key={0} value="0"> Choose UserProfile</option>
                    {
                    userProfiles.map(c => {
                        return <option key={c.id} value={c.id}>{c.displayName}</option>
                    })
                    }
                </select>
                </div>
                <div className="cards-column">
                {
                    (userProfiles.length > 0)
                    ? userProfiles.map((review) => (
                        <Review key={review.id} review={review} />
                    ))
                    : <div><p>No reviews matched your criteria.</p></div>
                } */}
                </div>
            </div>
            </div>
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
                        {favoritePosts.map((favoritePost) => (
                            <FavoritePost key={favoritePost.id} favoritePost={favoritePost} />
                        ))}
                    </div>
        </section>
    );
};