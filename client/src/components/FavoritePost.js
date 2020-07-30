import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom"
import { format } from 'date-fns'

export const FavoritePost = ({ favoritePost }) => {
    return (
        <Card className="m-4 favoritePost">
            <CardBody>
                <div className="favoritePostTitle">
                    <Link to={`/favoritePosts/${favoritePost.id}`}>
                        <h3>{favoritePost.title}</h3>
                    </Link>
                </div>
                <div className="favoritePostItems">
                    <p>by: {favoritePost.userProfile.displayName}</p>
                    <p>Created: {format(new Date(favoritePost.createDateTime), 'MM/dd/yyyy')}</p>
                </div>
            </CardBody>
        </Card>
    );
};