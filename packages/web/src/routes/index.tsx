import React, { FunctionComponent, useContext } from "react";
import { Route, Routes } from "react-router";
import Menu from "../components/Menu";
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";
import StatusCode from "../pages/StatusCode";
import ClientList from "../pages/ClientList";
import { AuthContext } from "../context/Auth";
import RandomImage from "../pages/RandomImage";

const Private = ( props: { Item: FunctionComponent }) => {
  const { signed } = useContext(AuthContext);

  const { Item } = props;

  return ( (signed) ? <Item/> : <Login/>);

}

const RouteApp = () => {

  return (
    <React.StrictMode>
      <Menu></Menu>
      <Routes>
        <Route index path="/" element={<Login/>} ></Route>
        <Route path="/home/:pgid?/:search?" element={<Private Item={Home}/>}></Route>
        <Route path="/status-codes" element={<Private Item={StatusCode} />}></Route>
        <Route path="/random-image" element={<Private Item={RandomImage} />}></Route>
        <Route path="/client-list" element={<Private Item={ClientList} />}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/signin" element={<Login/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </React.StrictMode>
  );

};

export default RouteApp;