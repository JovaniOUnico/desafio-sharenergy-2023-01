import React, { useContext, useState } from 'react'
import * as C from './styles'
import * as F from '../../styles/forms'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/Auth'
import User from '../../types/User'

const SignUp = () => {

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [confirmeSenha, setConfirmeSenha] = useState<string>("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value)
  }

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmeSenha(e.target.value)
  }

  const handleSignUp = async () => {
    if (!email && !senha && !name) {
      setError("Preencha todos os campos")
      return
    }

    let user: User = {name: name,
                      email: email,
                      password: senha};

    const res = await signup(user);

    if (res) {
      let resString = res.toString();

      setError("");
      setSuccess("conta cadastrada com sucesso");

      setTimeout(() => {
        navigate("/signin");
      },2300);

      return;
    }
  };

  return (
    <C.Container>
      <F.Label>
        Registre-se aqui
      </F.Label>

      <C.Content>
        <Input
          type='name'
          placeholder='digite seu nome'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleName(e); setError('')  }}
        />
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
        <Input
          type='password'
          placeholder='confirme sua senha'
          value={confirmeSenha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleConfirmPassword(e); setError('')  }}
        />

        <F.LabelError>
          {error}
        </F.LabelError>

        <F.LabelSuccess>
          {success}
        </F.LabelSuccess>

        <Button text="Cadastrar"
                onClick={handleSignUp}
                Type='submit'/>

        <F.LabelSignup>
          Já tem uma conta?&nbsp;
          <F.Strong>
            <Link to='/home'>
              Faça o Login
            </Link>
          </F.Strong>
        </F.LabelSignup>
      </C.Content>
    </C.Container>
  )
}

export default SignUp