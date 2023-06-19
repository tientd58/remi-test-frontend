import React, { useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

import { Spinner } from '../../components/Spinner';
import { useAppSelector } from '../../hooks/appHooks';
import { useShareVideos } from '../../hooks/useShareVideos';

type Props = {}

const ListVideoPage: React.FC<Props> = () => {
  const { handleFetchSharedVideos } = useShareVideos();
  const { isFetching, sharedVideos } = useAppSelector((state) => state.video);
  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
  };

  useEffect(() => {
    handleFetchSharedVideos();
  }, [handleFetchSharedVideos]);

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className='container col-md-12 col-lg-8 col-sm-12 col-xs-12'>
      {sharedVideos.length > 0 ? (
        sharedVideos.map((item) => (
          <div className='row mt-3' key={item._id}>
            <div className='col-md-6 col-lg-6 col-sm-12 col-xs-12'>
              <YouTube
                videoId={item.linkId}
                opts={opts}
                className='video-abc'
              />
            </div>
            <div className='col-md-6 col-lg-6 col-sm-12 col-xs-12'>
              <p className='video-title'>{item.title}</p>
              <p className='video-auth'>Shared by: {item.userShared.email}</p>
              <p>
                Description:
                <span className='video-description'>{item.description}</span>
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>have no video</p>
      )}
    </div>
  );
};

export default ListVideoPage;