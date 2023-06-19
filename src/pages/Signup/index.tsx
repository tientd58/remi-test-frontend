import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { useSignup } from '../../hooks/useSignup';
import { IUser } from '../../types/userType';

type Props = {}

const Signup: React.FC<Props> = () => {
  const {loading, handleSignup, validationSchema} = useSignup();
  const initialValues: IUser = {
    username: "",
    email: "",
    password: "",
  };

  return (
    <div className="col-md-12">
      <h2 className="form-title">FUNNY MOVIES</h2>
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          <Form>
            <div>
              <div className="form-group">
                <label htmlFor="username"> Username </label>
                <Field name="username" type="text" className="form-control" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email"> Email </label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group button-login">
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Signup</span>
                </button>
                <p>or</p>
                <a href="/signin">
                  <p>Signin with your account</p>
                </a>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
