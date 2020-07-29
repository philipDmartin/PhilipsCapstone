import React, { useState, useContext, useRef } from "react";
import { Card, CardBody, Button, ModalBody, Modal, ModalHeader, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
// import { UserTypeForm } from "./UserTypeForm";

export const Profile = () => {
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    const [modal, setModal] = useState(false)
    const toggleEdit = () => setModal(!modal)

    return (
        <Card className="profile_details">
            <section className="upd_details">
                <CardBody className="upd_card">
                    <h1>{userProfile.firstName} {userProfile.lastName}</h1>
                    <br />
                    <h3>UserName:  {userProfile.displayName}</h3>
                    <h3>Email:  {userProfile.email}</h3>
                    <CardImg className="upd_img" src={userProfile.imageLocation} />
                </CardBody>
                <div><Button color="warning" onClick={toggleEdit}>Edit</Button></div>
            </section>
        </Card>
    );
};
