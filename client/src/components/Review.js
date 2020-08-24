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
                    <p className="itemBorder">Reviewed by: {review.userProfile.displayName}</p>
                    <p className="itemBorder">Category: {review.category}</p>
                    <p className="itemBorder">Stars: {review.stars}</p>
                </div>
            </CardBody>
        </Card>
    );
};
