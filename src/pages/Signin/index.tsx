import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { useSignin } from '../../hooks/useSignin';
import { IUserLogin } from '../../types/userType';

type Props = {}

const Signin: React.FC<Props> = () => {
  const {loading, handleSignin, validationSchema} = useSignin();
  const initialValues: IUserLogin = {
    username: "",
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
          onSubmit={handleSignin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
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
                <span>Signin</span>
              </button>
              <p>or</p>
              <a href="/signup">
                <p>Sign up a new account</p>
              </a>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;