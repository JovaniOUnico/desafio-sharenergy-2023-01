import React, { useState, useContext, useEffect } from 'react';
import * as L from './styles';
import * as F from '../../styles/forms';
import Button from '../../components/Button';
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import User from '../../types/User'

const Login = () => {

  const { signin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    setEmail(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    // No longer need to cast to any - hooray for react!
    setSenha(e.target.value)
  }

  const handleLogin = async () => {

    if (!email && !senha) {
      setError("Preencha todos os campos")
      return
    }

    let user: User = {name: '', email: email, password: senha};

    const canLogin = await signin(user, rememberMe);

    if (!canLogin) {
      setError("usuario ou senha inválidos");
      return;
    }

    navigate("/home");

  }

  return (<L.Container>
            <F.Label>Sistema de Login</F.Label>
            <L.Content>
              <Input
                type='email'
                placeholder='digite seu email'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleEmail(e); setError('')  }}
              />

              <Input
                type='password'
                placeholder='digite sua senha'
                value={senha}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handlePassword(e); setError('')  }}
              />
              <div>
                <input type="checkbox"
                       value="remenber"
                       defaultChecked={rememberMe}
                       onChange={() => { setRememberMe(!rememberMe);}} /> Lembrar de mim
              </div>
              <F.LabelError>{error}</F.LabelError>
              <Button text="Entrar" onClick={handleLogin} Type='submit'/>
              <F.LabelSignup>
                Não tem uma conta?&nbsp;
                <F.Strong>
                  <Link to='/signup'>Registre-se</Link>
                </F.Strong>
              </F.LabelSignup>
            </L.Content>
          </L.Container>);
}

export default Login;