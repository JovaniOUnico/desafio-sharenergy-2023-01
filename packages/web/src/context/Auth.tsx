import React, { createContext, useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import User from '../types/User'

export type AuthContextType = {
  user: User | undefined;
  signed: boolean;
  signin: (user: User, remember_me: boolean) => Promise<boolean>;
  signup: (user: User) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null!);

//TODO SALVAR SENHA ENCRIPITADA
export const AuthProvider = ({ children }: { children: JSX.Element[] }) => {

  const [ user, setUser ] = useState<User | undefined>();
  const api = useApi();
  const [ signed, setSigned ]= useState<boolean>();

  useEffect(() => {

    var sessionToken = sessionStorage.getItem('user_token');
    var localToken   = localStorage.getItem("user_token");

    const userToken = (sessionToken != null) ? sessionToken : localToken;

    if( userToken ) {
      var hasUser = false;
      
      const data = async () => {
        let verify = await api.verifyToken(userToken);

        hasUser = verify.userIsVerified;
        
        const name: string = verify.user.name;
        const email: string = verify.user.email;
        const password: string = verify.user.password;

        if(!hasUser) {
          //desloga
          setSigned(false);
          signout();
        } else {
          setUser({name: name, email: email, password: password})

          //TODO ATUALIZAR TOKEN
          setSigned(true); 
        }
      }

      data()
      
    }

  }, []);

  //busca de usuário para login
  const signin = async ({name, email, password}: User, remember_me: boolean): Promise<boolean> => {

    const data = await api.signin(email, password);

    let hasUser = data.hasUser;

    if(hasUser) {

      let token = data.token;
      name = data.name;
      setSigned(true);

      if(remember_me) {
        localStorage.setItem('user_token', token);
      } else {
        sessionStorage.setItem('user_token', token);
      }
  
      setUser({name, email, password})

    }

    return hasUser;

  }

  //cadastro de usuário
  const signup = async ({name, email, password}: User): Promise<boolean> => {

    if(name && email && password ) {
      const data = await api.signup(name, email, password);

      console.log(data);

      if(data.status == 'success' && data.user) {
        
        return true;
      } else {

        return false
      }

    } else {
      return false;
    }

  }

  const signout = async () => {
    var sessionToken = sessionStorage.getItem('user_token');
    var localToken   = localStorage.getItem("user_token");

    const userToken = (sessionToken != null) ? sessionToken : localToken;

    if(user?.email && userToken) {
      const data = await api.logout(user?.email, userToken);

      if(data.logoutSuccess) {

        setUser(undefined);
        setSigned(false);
        localStorage.setItem('user_token', "");
        sessionStorage.setItem('user_token', "");

      } else {
        //chamar o logout novamente

      }

    }

  }

  return (
    <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );

};
