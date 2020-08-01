import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom"
import { format } from 'date-fns'

export const Review = ({ review }) => {
    return (
        <Card className="m-4 review">
            <CardImg top src={review.imageLocation} />
            <CardBody>
                <div className="reviewTitle">
                    <Link to={`/reviews/${review.id}`}>
                        <h3>{review.title}</h3>
                    </Link>
                </div>
                <div className="reviewItems">
                    {/* <p>Reviewed by: {review.userProfile.displayName}</p> */}
                    <p>Category: {review.category}</p>
                    <p>Stars: {review.stars}</p>
                    {/* <p>Created: {format(new Date(review.createDateTime), 'MM/dd/yyyy')}</p> */}
                </div>
            </CardBody>
        </Card>
    );
};
