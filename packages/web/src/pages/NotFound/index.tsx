import React from "react";
import { Link } from "react-router-dom";
import * as C from './style'

const NotFound = () => {

  return (<C.Container direction="column">
            <C.Container direction="row">
              <C.Backdrop>
                <C.H1>
                  404
                </C.H1>
              </C.Backdrop>
            </C.Container>
            <C.Container direction="column">
              Página não encontrada
              <p>Clique em <Link to='/home'>Home</Link> para voltar a página inicial</p>
            </C.Container>
          </C.Container>)

};

export default NotFound;