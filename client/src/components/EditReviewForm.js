import React, { useContext, useState, useEffect } from "react";
import { ReviewContext } from "../providers/ReviewProvider";
import { Button, Form } from "reactstrap";
import { useHistory } from "react-router-dom";

export const EditReviewForm = (props) => {
  const { updateReview } = useContext(ReviewContext);
  const [profileUpdate, setReview] = useState(props.review);
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newReview = Object.assign({}, profileUpdate);
    newReview[event.target.name] = event.target.value;
    setReview(newReview);
  };

  const editReview = () => {
    updateReview(profileUpdate).then(props.toggle).then(history.push(`/reviews/${props.review.id}`));
  };

  return (
    <>
      <Form className="editReviewForm">
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
                placeholder="Edit review title"
                defaultValue={props.review.title}
                onChange={handleControlledInputChange}
              />
              Content:
              <input
                type="textarea"
                name="content"
                rows="20"
                columns="50"
                required
                autoFocus
                className="form-control"
                placeholder="Edit content"
                defaultValue={props.review.content}
                onChange={handleControlledInputChange}
              />
              Stars:
              <input
                type="textarea"
                name="stars"
                rows="20"
                columns="50"
                required
                autoFocus
                className="form-control"
                placeholder="Edit stars"
                defaultValue={props.review.stars}
                onChange={handleControlledInputChange}
              />
              Category:
              <input
                type="textarea"
                name="category"
                rows="20"
                columns="50"
                required
                autoFocus
                className="form-control"
                placeholder="Edit category"
                defaultValue={props.review.category}
                onChange={handleControlledInputChange}
              />
              Header Image:
              <input
                type="text"
                name="imageLocation"
                className="form-control"
                placeholder="Edit review image"
                defaultValue={props.review.imageLocation}
                onChange={handleControlledInputChange}
              />
            </label>
          </div>
        </fieldset>

        <Button
          color="primary"
          onClick={(e) => {
            e.preventDefault();
            editReview();
          }}
        >
          Save Updates
        </Button>
        <Button onClick={props.toggle}>Cancel</Button>
      </Form>
    </>
  );
};
