import React, { useContext, useState, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Button, Form } from "reactstrap";
import { useHistory } from "react-router-dom";

//passsed from parent component
export const EditProfileForm = (props) => {
  const { updateProfile, getProfile } = useContext(UserProfileContext);
  const [profileUpdate, setProfile] = useState(props.userProfile);
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newProfile = Object.assign({}, profileUpdate);
    newProfile[event.target.name] = event.target.value;
    setProfile(newProfile);
  };

  const editProfile = () => {
    return updateProfile(profileUpdate)
        .then(props.toggle)
        .then(getProfile(props.userProfile.id))
        .then(history.push(`/profile/${props.userProfile.id}`));
  };

  return (
    <>
      <Form className="editProfileForm">
        <fieldset>
          <div className="form-group">
            <label htmlFor="userProfile">
            UserName:
              <input
                type="textarea"
                name="displayName"
                rows="20"
                columns="50"
                required
                autoFocus
                className="form-control"
                placeholder="Edit displayName"
                defaultValue={props.userProfile.displayName}
                onChange={handleControlledInputChange}
              />
              Image:
              <input
                type="textarea"
                name="imageLocation"
                rows="20"
                columns="50"
                required
                autoFocus
                className="form-control"
                placeholder="Edit imageLocation"
                defaultValue={props.userProfile.imageLocation}
                onChange={handleControlledInputChange}
              />
            </label>
          </div>
        </fieldset>

        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            editProfile();
          }}
        >
          Save Updates
        </Button>
        <Button onClick={props.toggle}>Cancel</Button>
      </Form>
    </>
  );
};









// import React, { useState, useContext, useRef } from "react";
// import { Card, CardBody, Button, ModalBody, Modal, ModalHeader, CardImg } from "reactstrap";
// import { Link } from "react-router-dom";
// import { UserProfileContext } from "../providers/UserProfileProvider";

// export const Profile = ({ profile }) => {
//     const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

//     const [modal, setModal] = useState(false)
//     const toggle = () => setModal(!modal)

//     const userName = useRef()
//     const imageLocation = useRef()

//     const { updateProfile } = useContext(UserProfileContext)
//     const [editModal, setEditModal] = useState(false)
//     const toggleEdit = () => setEditModal(!editModal)

//     const profileEdit = () => {
//         updateProfile({
//             userName: userName.current.value,
//             imageLocation: imageLocation.current.value
//         }).then(toggleEdit)
//     }

//     return (
//         <Card className="cetagoryStyleCard">
//             <CardBody>
//                 <h4>{userProfile.Username}</h4>
//                 <div className="profilebtns">

//                     <Button className="profileBtn, profileEditBtn" color="warning" onClick={toggleEdit}>Edit</Button>

//                     <Modal isOpen={editModal} toggle={toggleEdit}>
//                         <ModalHeader toggle={toggleEdit}>
//                             Edit {Userprofile.userName}</ModalHeader>
//                         <ModalBody >
//                             <div className="form-group">
//                                 <input
//                                     type="text"
//                                     id="userName"
//                                     ref={userName}
//                                     required
//                                     autoFocus
//                                     className="form-control"
//                                     defaultValue={Userprofile.userName}
//                                 />
//                                 <br />
//                                 <div className="">
//                                     <button type="submit"
//                                         onClick={
//                                             evt => {
//                                                 evt.preventDefault()
//                                                 profileEdit(userprofile)
//                                             }}
//                                         className="btn btn-success button_margin">
//                                         Save Changes</button>
//                                     <button type="submit"
//                                         onClick={
//                                             evt => {
//                                                 evt.preventDefault()
//                                                 toggleEdit()
//                                             }}
//                                         className="btn btn-secondary">
//                                         Cancel</button>
//                                 </div>
//                             </div>
//                         </ModalBody>
//                     </Modal>
//                 </div>
//             </CardBody>
//         </Card>
//     );
// };