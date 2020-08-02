import React, { useContext, useEffect } from 'react';
import { Form } from 'reactstrap';
import { ReviewContext } from "../providers/ReviewProvider";
import SelectSearch from 'react-select-search';
// import { UserProfileContext } from './providers/UserProfileProvider';

const ReviewSearch = () => {
    const { getAllReviews, reviews } = useContext(ReviewContext);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
   
    // const handleChange = (e) => {
    //     searchPosts(e.target.value)
    // }

    useEffect(() => {
        getAllReviews()
    }, [])

    // const options = [
    //     { name: 'Swedish', value: 'sv' },
    //     { name: 'English', value: 'en' },
    //     {
    //         type: 'group',
    //         name: 'Group name',
    //         items: [
    //             { name: 'Spanish', value: 'es' },
    //         ]
    //     },
    // ];

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Form>
                    <SelectSearch
                        options={reviews}
                        search
                        placeholder="Select Review"
                        // onChange={handleChange}
                    />
                </Form>
            </div>
        </div>
    )
}
export default ReviewSearch
