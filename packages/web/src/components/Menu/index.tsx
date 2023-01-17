import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import * as N from './styles'

const Menu = () => {
  const { signed } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate("/logout");
  }

  return (
    <header>
      <N.NavBar>
        <hgroup>
          <h1>Share Energy Challenge</h1>
        </hgroup>
        <ul>
          <li>
            <Link to='/home'>
              Home
            </Link>
          </li>

          {(signed) ? <>
                        <li>
                          <Link to='/status-codes'>
                            Status Code
                          </Link>
                        </li>
                        <li>
                          <Link to='/random-image'>
                            Random Image
                          </Link>
                        </li>
                        <li>
                          <Link to='/client-list'>
                            Client List
                          </Link>
                        </li>
                      </> 
                    : <>
                        <li>
                          <Link to='/signin'>
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to='/signup'>
                            Sign Up
                          </Link>
                        </li>
                      </> }
        </ul>

        {(signed) ? <ul className='user-config'>
                      <li className='logout'
                          onClick={handleLogout}>
                        <a href='#'>
                          Logout
                        </a>
                      </li>
                    </ul> : ''}
      </N.NavBar>
    </header>
  );
};

export default Menu;