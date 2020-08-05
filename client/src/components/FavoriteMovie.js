import React, { useState, useContext, useRef, Link } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader, CardImg } from "reactstrap";
import { FavoriteMovieContext } from "../providers/FavoriteMovieProvider";
import { format } from 'date-fns'
import { EditFavoriteMovieForm } from "./EditFavoriteMovieForm";

export const FavoriteMovie = ({ favoriteMovie }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const { deleteFavoriteMovie } = useContext(FavoriteMovieContext)

    return (
        <Card className="favoriteMovie_card">
            <CardBody>
                <CardImg top src={favoriteMovie.review.imageLocation} />
                <p>Why: {favoriteMovie.why}</p>
                <p>Title: {favoriteMovie.review.title}</p>
                <p>Stars: {favoriteMovie.review.stars}</p>
                <p>Category: {favoriteMovie.review.category}</p>
                <p>Created: {format(new Date(favoriteMovie.review.createDateTime), 'MM/dd/yyyy')}</p>

                <div>
                    <Button color="warning" onClick={toggleEdit}>Edit</Button>
                    <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalBody toggle={toggleEdit}>
                                <EditFavoriteMovieForm favoriteMovie={favoriteMovie} toggle={toggleEdit} />
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