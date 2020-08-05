import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader, CardImg } from "reactstrap";
import { useParams } from "react-router-dom";
import { EditProfileForm } from "./EditProfileForm";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const Profile = () => {
    const {Id} = useParams()
    const { getProfile } = useContext(UserProfileContext)

    const [userProfile, setUserProfile] = useState([])

    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)

    const [editModal, setEditModal] = useState(false)
    const toggleEdit = () => setEditModal(!editModal)

    //component renders no info.then use effect runs, logic will exicute
    //when state chenges triggers another render to see info on screen
    useEffect(() => {
        getProfile(parseInt(Id)).then(setUserProfile);
    }, []);

    //props info line 35
    return (
        <Card className="profile_details">
            <section className="upd_details">
                <CardBody className="upd_card">
                        <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                        <br />
                        <h3>UserName:  {userProfile.displayName}</h3>
                        <h3>Email:  {userProfile.email}</h3>
                    <CardImg className="upd_img" src={userProfile.imageLocation} />

                    <div><Button color="warning" onClick={toggleEdit}>Edit</Button>
                        <Modal isOpen={editModal} toggle={toggleEdit}>
                            <ModalBody className="ProfileModalBody">
                                <EditProfileForm userProfile={userProfile} toggle={toggleEdit} />
                            </ModalBody>
                        </Modal>
                    </div>
                </CardBody>
            </section>
        </Card>
    );
};
