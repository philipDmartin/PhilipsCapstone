import React, { useState, useContext, useRef, Link } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader } from "reactstrap";
import { FavoriteMovieContext } from "../providers/FavoriteMovieProvider";
import { FavoritePostContext } from "../providers/FavoritePostProvider";
import { ReviewContext } from "../providers/ReviewProvider";

export const FavoriteMovie = ({ favoriteMovie, favoritePostId }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const why = useRef()
    // const review = useRef()

    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    const { deleteFavoriteMovie, updateFavoriteMovie } = useContext(FavoriteMovieContext)
    const { favoritePost } = useContext(FavoritePostContext)
    const { review } = useContext(ReviewContext)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const favoriteMovieEdit = (favoriteMovie) => {
        return updateFavoriteMovie({
            id: parseInt(favoriteMovie.id),
            why: why.current.value,
            review: favoriteMovie.review,
            FavoritePostId: favoriteMovie.FavoritePostId,
            userProfileId: favoriteMovie.favoritePost.userProfile.id,
            createDateTime: favoriteMovie.favoritePost.createDateTime
        }).then(toggleEdit)
    }

    return (
        <Card className="favoriteMovie_card">
            <CardBody>
                <p>Why: {favoriteMovie.why}</p>
                <p>Review: {favoriteMovie.reviewId}</p>
                
                {/* <div className="reviewTitle">
                    <Link to={`/reviews/${favoriteMovie.id}`}>
                        <h3>{favoriteMovie.reviewId}</h3>
                    </Link>
                </div> */}

                <div>
                    <Button className="button_margin" color="warning" onClick={toggleEdit}>Edit</Button>
                    <Modal isOpen={editModal} toggle={toggleEdit}>
                        <ModalHeader toggle={toggleEdit}>
                            Edit {favoriteMovie.why}</ModalHeader>
                        <ModalBody >
                            <div className="form-group"> Why
                                <input
                                    type="text"
                                    id="why"
                                    ref={why}
                                    required
                                    autoFocus
                                    className="form-control"
                                    defaultValue={favoriteMovie.why}
                                />
                                <br />
                                <input
                                    type="text"
                                    id="review"
                                    ref={review}
                                    required
                                    autoFocus
                                    className="form-control"
                                    defaultValue={favoriteMovie.review}
                                />
                                <br />
                                <div className="">
                                    <button type="submit"
                                        onClick={
                                            evt => {
                                                evt.preventDefault()
                                                favoriteMovieEdit(favoriteMovie)
                                            }}
                                        className="btn btn-success button_margin">
                                        Save Changes</button>
                                    <button type="submit"
                                        onClick={
                                            evt => {
                                                evt.preventDefault()
                                                toggleEdit()
                                            }}
                                        className="btn btn-secondary">
                                        Cancel</button>
                                </div>
                            </div>
                        </ModalBody>
                    </Modal>

                    <Button color="danger" onClick={toggle}>Delete</Button>

                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}>
                            Are you sure you want to delete {favoriteMovie.Why}?</ModalHeader>

                        <ModalBody>
                            <button type="submit"
                                onClick={
                                    evt => {
                                        evt.preventDefault()
                                        toggle()
                                    }}
                                className="btn btn-primary">
                                Cancel</button>
                            <button type="submit"
                                onClick={
                                    evt => {
                                        evt.preventDefault()
                                        deleteFavoriteMovie(favoriteMovie).then(toggle)
                                    }}
                                className="btn btn-danger">
                                Delete</button>
                        </ModalBody>
                    </Modal>
                </div>
            </CardBody>
        </Card>
    );
};