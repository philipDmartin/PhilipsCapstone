import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const history = useHistory();
  const { register } = useContext(UserProfileContext);

  const [displayName, setDisplayName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [imageLocation, setImageLocationName] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { displayName, firstName, lastName, imageLocation, email};
      register(userProfile, password)
        .then(() => history.push("/"));
    }
  };

  return (
    <Form onSubmit={registerClick} className="login">
      <fieldset>
        <FormGroup className="nameLogin">
          <Label htmlFor="displayName">DisplayName</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup >
        <FormGroup className="nameLogin">
          <Label htmlFor="firstName">FirstName</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup className="nameLogin">
          <Label htmlFor="lastName">LastName</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup className="nameLogin">
          <Label htmlFor="imageLocation">ImageLocation</Label>
          <Input id="imageLocation" type="text" onChange={e => setImageLocationName(e.target.value)} />
       </FormGroup>
        <FormGroup className="nameLogin">
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup className="nameLogin">
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup className="nameLogin">
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
