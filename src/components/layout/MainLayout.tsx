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
      <nav className="navbar navbar-expand navbar-dark bg-dark header-menu">
        <div>
          <Link to={"/"} className="navbar-brand">
            FUNNY MOVIES
          </Link>
        </div>
      <div className="navbar-nav ml-auto">
        {currentUser && (
          <li className="nav-item">
            <p className="header-welcome">Welcome {currentUser.username}</p>
          </li>
        )}
        <li className="nav-item">
          <button type="submit" className="btn btn-primary btn-block button-custom">
            <Link to={"/share-video"} className="nav-link">
              Share a movie
            </Link>
          </button>
        </li>
        <li className="nav-item">
          <button type="submit" className="btn btn-danger btn-block button-custom">
            <a href="/signin" className="nav-link" onClick={logOut}>
              Logout
            </a>
          </button>
        </li>
      </div>
      </nav>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
}

export default MainLayout;
