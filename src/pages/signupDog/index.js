import React, { useState, useHistory } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { REGISTER_DOG } from "../../graphql/queries";

import { useMutation } from "@apollo/react-hooks";

export default function SignupDog(props) {
  const id = localStorage.getItem("user");
  const history = useHistory;
  const [variables, setVariables] = useState({
    name: "",
    gender: "",
    imageUrl: "",
    tagLine: "",
    ownerId: parseInt(id),
  });
  const [errors, setErrors] = useState({});

  const [registerDog, { loading }] = useMutation(REGISTER_DOG, {
    update: (_, __) => props.history.push("/feed"),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();

    registerDog({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Add your dog!</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors.name && "text-danger"}>
              {errors.name ?? "name"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.name}
              className={errors.name && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.gender && "text-danger"}>
              {errors.gender ?? "gender"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.gender}
              className={errors.gender && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, gender: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.imageUrl && "text-danger"}>
              {errors.imageUrl ?? "imageUrl"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.imageUrl}
              className={errors.imageUrl && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, imageUrl: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.tagLine && "text-danger"}>
              {errors.tagLine ?? "tagLine"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.tagLine}
              className={errors.tagLine && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, tagLine: e.target.value })
              }
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "loading.." : "Add dog"}
            </Button>
            <br />
            <small>
              Want to add your dog later? <Link to="/login">Go to feed!</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
