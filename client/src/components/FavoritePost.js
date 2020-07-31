import React, { useContext, useState } from "react";
import { Card, CardImg, CardBody, ModalHeader, ModalBody, Modal, Button } from "reactstrap";
import { Link } from "react-router-dom"
import { format } from 'date-fns'
import { FavoritePostContext } from "../providers/FavoritePostProvider";
import { EditFavoritePostForm } from "./EditFavoritePostForm";

export const FavoritePost = ({ favoritePost }) => {

    const { deleteFavoritePost } = useContext(FavoritePostContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

// debugger
    return (
        <Card className="m-4 favoritePost">
            <CardBody>
                <div className="favoritePostTitle">
                    <Link to={`/favoriteMovies/${favoritePost.id}`}>
                        <h3>{favoritePost.title}</h3>
                    </Link>
                </div>
                <div className="favoritePostItems">
                    <p>by: {favoritePost.userProfile.displayName}</p>
                    <p>Created: {format(new Date(favoritePost.createDateTime), 'MM/dd/yyyy')}</p>
                </div>
                <div className="favoritePostBtns">
                    <div><Button color="danger" onClick={toggle}>Delete</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>
                                Are you sure you want to delete {favoritePost.title}?
                            </ModalHeader>
                            <ModalBody className="FavoritePostModalBody">
                                <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault()
                                            deleteFavoritePost(favoritePost.id).then(toggle)
                                        }}
                                    className="btn btn-danger button_margin">
                                    Delete
                                </button>
                                <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault()
                                            toggle()
                                        }}
                                    className="btn btn-primary">
                                    Cancel
                                </button>
                            </ModalBody>
                        </Modal>
                    </div>
                    <div><Button color="warning" onClick={toggleEdit}>Edit</Button>
                        <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalBody className="FavoritePostModalBody">
                                <EditFavoritePostForm favoritePost={favoritePost} toggle={toggleEdit} />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};
