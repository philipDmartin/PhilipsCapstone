import React, { useContext, useState, useEffect } from "react";
import { FavoritePostContext } from "../providers/FavoritePostProvider";
import { Button, Form } from "reactstrap";
import { useHistory } from "react-router-dom";

export const EditFavoritePostForm = (props) => {
  const { updateFavoritePost } = useContext(FavoritePostContext);
  const [profileUpdate, setFavoritePost] = useState(props.favoritePost);
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newFavoritePost = Object.assign({}, profileUpdate);
    newFavoritePost[event.target.name] = event.target.value;
    setFavoritePost(newFavoritePost);
  };

  const editFavoritePost = () => {
    updateFavoritePost(profileUpdate).then(props.toggle).then(history.push(`/favoritePosts/${props.favoritePost.id}`));
  };

  return (
    <>
      <Form className="editFavoritePostForm">
        <fieldset>
          <div className="form-group">
            <label htmlFor="title">
              Title:
              <input
                type="text"
                name="title"
                required
                autoFocus
                className="form-control"
                placeholder="Edit favoritePost title"
                defaultValue={props.favoritePost.title}
                onChange={handleControlledInputChange}
              />
            </label>
          </div>
        </fieldset>

        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            editFavoritePost();
          }}
        >
          Save Updates
        </Button>
        <Button onClick={props.toggle}>Cancel</Button>
      </Form>
    </>
  );
};