import * as Yup from 'yup';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Socket } from 'socket.io-client';
import { useState, useCallback } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { useAppDispatch } from './appHooks';
import { IYoutubeURL } from '../types/userType';
import { SocketContext } from '../context/socket';
import AuthService from "../services/tokenServices";
import { fetchVideos, shareNewVideo } from '../stores/ShareVideo/ShareVideoAPIs';

export const useShareVideos = () => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const socket: Socket = useContext(SocketContext);
  
  const validationSchema = Yup.object().shape({
    youtubeUrl: Yup.string()
      .trim()
      .matches(
        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
        'Is not correct youtube video url format')
      .required("This field is required!"),
  });

  const detectLinkIdFromUrl = (url: string) => {
    const regex = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const result = url.match(regex);
    return result ? result[1] : null;
  };

  const handleFetchSharedVideos = useCallback(() => {
    dispatch(fetchVideos(() => {

    }));
  }, [dispatch]);

  const handleShareVideo = useCallback(({youtubeUrl}: IYoutubeURL) => {
    const linkId = detectLinkIdFromUrl(youtubeUrl);
    const currentUser = AuthService.getCurrentUser();
    const params = {
      linkId,
      userId: currentUser.id,
    };
    setLoading(true);
    dispatch(shareNewVideo({
      params,
      cbSuccess: (res: any) => {
        socket.emit("newEvent", {
          title: res.data.result.title,
          user: currentUser.email,
        });
        navigate("/");
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
  }, [dispatch, navigate, socket]);

  return {
    loading,
    validationSchema,
    handleShareVideo,
    handleFetchSharedVideos,
  }
};
