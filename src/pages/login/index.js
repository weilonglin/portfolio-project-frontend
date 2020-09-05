import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useHistory, Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import { gql } from "@apollo/client";
import { LOGIN_USER } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/react-hooks";

export default function Register(props) {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setErrors(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
      localStorage.setItem("token", data.login.token);
      props.history.push("/feed");
    },
  });

  const submitLoginForm = (e) => {
    e.preventDefault();

    loginUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1 className="text-center">Login</h1>
        <Form onSubmit={submitLoginForm}>
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
              {loading ? "loading.." : "Login"}
            </Button>
            <br />
            <small>
              Don't have an account? <Link to="/register">Register</Link>
            </small>
          </div>
        </Form>
      </Col>
    </Row>
  );
}
