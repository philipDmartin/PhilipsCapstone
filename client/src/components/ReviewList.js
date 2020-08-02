import React, { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from 'react-router-dom'
import { ReviewContext } from "../providers/ReviewProvider";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Label } from "reactstrap";
import { Form } from 'reactstrap';
import SelectSearch from 'react-select-search';

import { Review } from "./Review";
import ReviewSearch from "./ReviewSearch";

// import { SearchBar } from "./ReviewSearchBar"
// import { SearchResults } from "./ReviewSearchResults"

export const ReviewList = () => {

    const { reviews, getAllReviews, addReview, filterReviewsByUserProfile} = useContext(ReviewContext);
    const { getUserProfiles, userProfiles } = useContext(UserProfileContext);

    const [reviewInput, setInput] = useState(false)
    const [searchTerms, setTerms] = useState(null);

    const title = useRef('title')
    const content = useRef('content')
    const stars = useRef('stars')
    const category = useRef('category')
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
    const imageLocation = useRef('imageLocation')
    const history = useHistory()

    useEffect(() => {
        getAllReviews();
    }, []);

    // useEffect(() => {
    //     getUserProfiles();
    //   }, []);
    
    //   const handleUserProfileChange = (e) => {
    //     e.preventDefault();
    
    //     const criterion = +e.target.value
    //     const approved = true
    //     filterReviewsByUserProfile(criterion, approved);
    //   };

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
            <div className="row justify-content-center">
            {/* <div className="reviewList">
                <SearchBar setTerms={setTerms} />
                <SearchResults searchTerms={searchTerms} />
                <div className="filterContainer">
                <Label for="content">Filter by UserProfile</Label>
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
                }
                </div>
            </div> */}
            </div>
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



// return (
//     <div className="row justify-content-center">
//       <div className="reviewList">
//         <SearchBar setTerms={setTerms} />
//         <SearchResults searchTerms={searchTerms} />
//         <div className="filterContainer">
//           <Label for="content">Filter by UserProfile</Label>
//           <select required onChange={handleUserProfileChange}>
//             <option key={0} value="0"> Choose UserProfile</option>
//             {
//               userprofiles.map(c => {
//                 return <option key={c.id} value={c.id}>{c.displayName}</option>
//               })
//             }
//           </select>
//         </div>
//         <div className="cards-column">
//           {
//             (userprofiles.length > 0)
//               ? userprofiles.map((review) => (
//                 <Review key={review.id} review={review} />
//               ))
//               : <div><p>No reviews matched your criteria.</p></div>
//           }
//         </div>
//       </div>
//     </div>
//   );
// };