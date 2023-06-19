import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useState, useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { IUser } from '../types/userType';
import { signup } from '../stores/Auth/AuthAPIs';
import { useAppDispatch } from './appHooks';

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleSignup = useCallback((formValue: IUser) => {
    setLoading(true);

    dispatch(signup({
      formValue,
      cbSuccess: (res: any) => {
        navigate("/signin");
        toast.success(res.data.message);
      },
      cbFailure: (error: any) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        toast.error(resMessage);
      },
    }));
  }, [dispatch, navigate]);

  return {
    loading,
    handleSignup,
    validationSchema,
  }
};
