import React, { useState, useHistory } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { REGISTER_USER } from "../../graphql/queries";

import { useMutation } from "@apollo/react-hooks";

export default function SignupUser(props) {
  const history = useHistory;
  const [variables, setVariables] = useState({
    full_name: "",
    userName: "",
    email: "",
    password: "",
    address: "",
    city: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, __) => props.history.push("/add-dog"),
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
  });

  const submitRegisterForm = (e) => {
    e.preventDefault();

    registerUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Register</h1>
        <Form onSubmit={submitRegisterForm}>
          <Form.Group>
            <Form.Label className={errors.full_name && "text-danger"}>
              {errors.full_name ?? "Full name"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.full_name}
              className={errors.full_name && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, full_name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.email && "text-danger"}>
              {errors.email ?? "Email address"}
            </Form.Label>
            <Form.Control
              type="email"
              value={variables.email}
              className={errors.email && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.userName && "text-danger"}>
              {errors.userName ?? "Username"}
            </Form.Label>
            <Form.Control
              type="text"
              value={variables.userName}
              className={errors.userName && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, userName: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className={errors.password && "text-danger"}>
              {errors.password ?? "Password"}
            </Form.Label>
            <Form.Control
              type="password"
              value={variables.password}
              className={errors.password && "is-invalid"}
              onChange={(e) =>
                setVariables({ ...variables, password: e.target.value })
              }
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "loading.." : "Register"}
            </Button>
            <br />
            <small>
              Already have an account? <Link to="/login">Login</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
