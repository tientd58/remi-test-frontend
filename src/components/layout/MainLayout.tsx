import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {IUser} from '../../types/userType';
import EventBus from "../../helpers/EventBus";
import AuthService from "../../services/tokenServices";

interface Props {
  children: React.ReactNode
}
const MainLayout: React.FC<Props> = (props:Props) => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.removeUser();
    setCurrentUser(undefined);
  };

  return (
    <div className="col-12">
      <div className="row header-container">
        <div className='col-md-3 col-lg-3 col-sm-3 col-xs-3 header-brand'>
          <Link to={"/"} className="navbar-brand">
            FUNNY MOVIES
          </Link>
        </div>
        <div className="col-md-9 col-lg-9 col-sm-9 col-xs-9">
          <div className="row header-right">
            {currentUser && (
              <div className="col-md-7 col-lg-8 col-sm-5 col-xs-4 mt-2">
                <p className="header-welcome">Welcome {currentUser.username}</p>
              </div>
            )}
            <div className="col-md-3 col-lg-2 col-sm-4 col-xs-4 mt-2">
              <button type="submit" className="btn btn-primary btn-block button-custom">
                <Link to={"/share-video"} className="nav-link">
                  Share a movie
                </Link>
              </button>
            </div>
            <div className="col-md-2 col-lg-2 col-sm-3 col-xs-4 mt-2">
              <button type="submit" className="btn btn-danger btn-block button-custom">
                <a href="/signin" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </button>
            </div>
          </div>
          
        </div>
      </div>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
}

export default MainLayout;
