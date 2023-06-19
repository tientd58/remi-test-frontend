import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useState, useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { IUserLogin } from '../types/userType';
import { signin } from '../stores/Auth/AuthAPIs';
import { useAppDispatch } from './appHooks';

export const useSignin = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleSignin = useCallback((formValue: IUserLogin) => {
    setLoading(true);

    dispatch(signin({
      formValue,
      cbSuccess: () => {
        navigate("/");
        window.location.reload();
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
    handleSignin,
    validationSchema,
  }
};
