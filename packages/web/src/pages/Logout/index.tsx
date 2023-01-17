import React, { useContext, useEffect } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import * as C from './styles'

const Logout = () => {

  const { signout } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {

    signout();

    setTimeout(() => {
      navigate('/home')
    }, 2000)

  }, [])

  return (<C.Container>
            <C.LoadContainer>
              <BiLoaderCircle/>
            </C.LoadContainer>
          </C.Container>)
}

export default Logout;