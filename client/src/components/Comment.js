import React, { useState, useContext, useRef } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader } from "reactstrap";
import { CommentContext } from "../providers/CommentProvider";
import { format } from "date-fns"

export const Comment = ({ comment, reviewId }) => {
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const content = useRef()

    const { deleteComment, updateComment } = useContext(CommentContext)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    const commentEdit = (comment) => {
        return updateComment({
            id: parseInt(comment.id),
            content: content.current.value,
            createDateTime: comment.createDateTime,
            reviewId: reviewId,
            userProfileId: comment.userProfile.id
        }).then(toggleEdit)
    }

    return (
        <Card className="comment_card">
            <p className="text-left px-2">by: {comment.userProfile.displayName}</p>
            <CardBody>
                <p className="commentContent">{comment.content}</p>
                <p className="commentDate">{format(new Date(comment.createDateTime), 'MM/dd/yyyy')}</p>

                <div>
                    <Button className="button_margin" color="warning" onClick={toggleEdit}>Edit</Button>
                    <Modal isOpen={editModal} toggle={toggleEdit}>
                        <ModalHeader toggle={toggleEdit}>
                            Edit {comment.content}</ModalHeader>
                        <ModalBody >
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="content"
                                    ref={content}
                                    required
                                    autoFocus
                                    className="form-control"
                                    defaultValue={comment.content}
                                />
                                <br />
                                <div className="">
                                    <button type="submit"
                                        onClick={
                                            evt => {
                                                evt.preventDefault()
                                                commentEdit(comment)
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
                            Are you sure you want to delete {comment.Content}?</ModalHeader>

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
                                        deleteComment(comment).then(toggle)
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