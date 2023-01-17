import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import UserData from '../../components/UserData';
import Input from '../../components/Input';
import PageButton from '../../components/PageButton';
import * as H from './styles';
import UserDataList from '../../components/UserDataList';
import SearchBar from '../../components/SearchBar';

const random_api = axios.create({
  baseURL: process.env.RANDOM_API
});

const Home = () => {

  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);

  /* usar esses aqui para filtrar a lista de usuarios */
  const [usuariosFiltered, setUsuariosFiltered] = useState([]);
  const [maxRegFiltered, setMaxRegFiltered] = useState(0);

  const [numReg, setNumReg] = useState(10);
  const [page, setPage] = useState(0);
  const [numPages, setNumPages] = useState(5);
  const [searchParam, setSearchParam] = useState('');

  const { pgid }   = useParams();
  const { search } = useParams();

  const maxReg = 500;

  const loadUsers = async () => {
    const usersApi = await random_api.get('/', {params: {page: page, results: maxReg, seed: 'abc'}});

    setUsuarios(usersApi.data.results);

    setUsuariosFiltered(usersApi.data.results);
    setMaxRegFiltered(usersApi.data.results.length);

    let search_aux: string;
    if(typeof search !== 'undefined') {
      search_aux = search;
      setSearchParam(search_aux);
    }

    let page_aux: number;
    if(typeof pgid !== 'undefined') {
      page_aux = parseInt(pgid);
      setPage(page_aux);
    }
  }

  useEffect(() => {

    loadUsers();

  }, [])

  useEffect(() => {

    if(searchParam == "") {

      changePage(0);
      setUsuariosFiltered(usuarios);
      setMaxRegFiltered(usuarios.length);

    } else {

      let auxFiltered = [];

      //Filtrar registros de usuario por aqui
      auxFiltered = usuarios.filter( (value) => {

        const name     = value['name']['first'] + ' ' +value['name']['last'];

        if(name.includes(searchParam)) {
          return true;
        }

        const username: string = value['login']['username'];

        if(username.includes(searchParam)) {
          return true;
        }

        const email: string   = value['email'];

        if(email.includes(searchParam)) {
          return true;
        }

        const age: string     = value['dob']['age'];

        if(email.includes(age)) {
          return true;
        }

        return false;

      });

      const newMaxReg = auxFiltered.length;

      changePage(0);
      setUsuariosFiltered(auxFiltered)
      setMaxRegFiltered(newMaxReg)

    }

  }, [searchParam])

  const changePage = (i: number) => {
    let lastPage = Math.round(maxRegFiltered/numReg);

    if(i < 0) {
      i = 0;
    }

    if(i > (lastPage)){
      i = lastPage;
    }

    setPage(i)
  }

  const listPageButtons = () => {
    let buttons = [];
    let qtdPages = Math.round(maxRegFiltered/numReg);

    if( qtdPages > 1) {

      buttons.push(<PageButton
                    key={0}
                    text="<<"
                    onClick={(e) => {
                      changePage(0)
                    }}
                    Type='button'></PageButton>);
      
      let aux_page = (page > 0) ? page - 1 : page;
      let contador = aux_page;

      let nPgControl = numPages;
      if(qtdPages < numPages) {
        nPgControl = qtdPages;
        aux_page = 0;
        contador = 0;
      } else if(contador > (qtdPages - nPgControl)) {
        contador = (qtdPages - nPgControl);
        aux_page = (qtdPages - nPgControl);
      }

      for(let i = contador; i < (aux_page + nPgControl); i++) {
        let numPage = i + 1;

        buttons.push(<PageButton
                      key={i+99}
                      text={numPage.toString()}
                      onClick={(e) => {
                        changePage(i); 
                      }}
                      Type='button'></PageButton>) 

      }

      buttons.push(<PageButton
                    key={qtdPages+100}
                    text=">>"
                    onClick={(e) => {
                      changePage(qtdPages - 1)
                    }}
                    Type='button'></PageButton>);
    }
    
    return buttons;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value)
  }

  const listUsers = () => {
    let users = [];

    let posAtual = (page * numReg);

    for(let i = posAtual; i < (posAtual + numReg); i++) {

      if(typeof usuariosFiltered[i] !== 'undefined') {
        const name     = usuariosFiltered[i]['name']['first'] + ' ' + usuariosFiltered[i]['name']['last'];
        const username = usuariosFiltered[i]['login']['username'];
        const foto     = usuariosFiltered[i]['picture']['thumbnail'];
        const email    = usuariosFiltered[i]['email'];
        const age      = usuariosFiltered[i]['dob']['age'];

        users.push({name: name, username: username, foto: foto, email: email, age: age});
      }

    }

    return users;

  }

  return (
    <div>
      <H.Header>
        <h1>
          Bem vindo
        </h1>
      </H.Header>

      <H.Container>
        <H.SearchContainer>
          <h2>
            Pequisa de Usuários
          </h2>
          <SearchBar type='text'
                 value={searchParam}
                 placeholder='Digite um nome para pesquisa'
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                             handleSearch(e)
                          }}/>
        </H.SearchContainer>

        {<UserDataList usuarios={listUsers()}/>}

        <H.PageList>
          {listPageButtons().map(
            (value, index) => {
              return value
            }
          )}
        </H.PageList>

        Pagina: {(page+1)}

      </H.Container>
    </div>
  )
}

export default Home