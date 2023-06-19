import React from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";

import { IYoutubeURL } from '../../types/userType';
import { useShareVideos } from '../../hooks/useShareVideos';

type Props = {}

const ShareVideoPage: React.FC<Props> = () => {
  const { handleShareVideo, validationSchema, loading } = useShareVideos();
  const initialValues: IYoutubeURL = { youtubeUrl: "" };

  return (
    <div className='container col-md-8 col-lg-6 col-sm-12 col-xs-12'>
      <div className="header-border mt-4">
        <h5 className="heading">
          <span>Share a youtube movie</span>
        </h5>
        <div className='row'>
          <div className='col-md-4 col-lg-3 col-sm-12 col-xs-12'>
            <p>Youtube URL</p>
          </div>
          <div className='col-md-8 col-lg-9 col-sm-12 col-xs-12'>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleShareVideo}
            >
              <Form>
                <div className="form-group">
                  <Field name="youtubeUrl" type="text" className="form-control" />
                  <ErrorMessage
                    name="youtubeUrl"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group button-login">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Share</span>
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareVideoPage;