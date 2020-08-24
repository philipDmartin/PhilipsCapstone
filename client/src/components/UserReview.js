import React, { useContext, useState } from "react";
import { Card, CardImg, CardBody, ModalHeader, ModalBody, Modal, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { UserReviewContext } from "../providers/UserReviewProvider";
import { EditReviewForm } from "./EditReviewForm";
import { CommentContext } from "../providers/CommentProvider";
import { format } from "date-fns"

export const UserReview = ({ review }) => {
    const { deleteReview } = useContext(UserReviewContext)
    const { deleteComment, comment } = useContext(CommentContext)

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    return (
        <Card className="userReview">
            <CardImg top src={review.imageLocation} />
            <CardBody>
                <div className="userReviewTitle">
                    <Link to={`/reviews/${review.id}`}>
                        <h3>{review.title}</h3>
                    </Link>
                </div>
                <div className="userReviewItems">
                    <div>
                        Reviewed by: <br />
                        {review.userProfile.displayName} <br />
                    </div>
                    {/* <div>
                        Date Created: <br />
                        {format(new Date(review.createDateTime), 'MM/dd/yyyy')} <br /><br />
                    </div> */}
                    <div>
                        Stars: <br />
                        {review.stars} <br />
                    </div>
                    <div>
                        Category: <br />
                        {review.category} <br /><br />
                    </div>
                </div>
                <div className="userReviewBtns">
                    <div><Button color="danger" onClick={toggle}>Delete</Button>
                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle}>
                                Are you sure you want to delete {review.title}?
                            </ModalHeader>
                            <ModalBody className="ReviewModalBody">
                                <button type="submit"
                                    onClick={
                                        evt => {
                                            evt.preventDefault()
                                            deleteReview(review).then(toggle)
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
                            <ModalBody className="ReviewModalBody">
                                <EditReviewForm review={review} toggle={toggleEdit} />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}
