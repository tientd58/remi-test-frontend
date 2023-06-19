import React, { useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';
import { socket, SocketContext } from './context/socket';
import { Routes } from './routes/Routes';
import AuthService from "./services/tokenServices";
import ErrorBoundary from './routes/components/ErrorBoundary';

const App:React.FC = () => {
  useEffect(() => {
    //listens for the event list from the backend
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      socket.on('shareVideo', (data) => {
        if (data) {
          toast.info(`The video ${data.title} has been shared by ${data.user}`);
        }
      });
    }
    return () => {
      socket.off('shareVideo');
      if (!currentUser) {
        socket.disconnect();
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes currentUser={AuthService.getCurrentUser()} />
        </ErrorBoundary>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </BrowserRouter>
    </SocketContext.Provider>
  );
}

export default App;
