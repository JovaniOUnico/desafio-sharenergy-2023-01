import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import SearchBar from "../../components/SearchBar";
import Image from "../../components/Image";
import * as S from './styles'

const StatusCode = () => {

  const [searchParams, setSearchParams] = useState('');
  const [image, setImage] = useState('');
  
  const handleSearchBar = (e: React.ChangeEvent<HTMLInputElement>) => {

    let searchVal = e.target.value;

    setSearchParams(searchVal);
  }

  const searchOnApi = () => {
    const searchApi = async () => {
      const catCodeImage = `${process.env.HTTP_CATS}/${searchParams}`;

      setImage(catCodeImage);
    }

    searchApi();
  }

  return (<div>
            <S.Container>
              <SearchBar type='text'
                        placeholder='digite aqui o código de status'
                        value={searchParams}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleSearchBar(e) }} />
              <Button text='Buscar código'
                      Type='button'
                      onClick={() => { searchOnApi() }} />
            </S.Container>
            <S.Center>
              <Image source={image}
                     imgDefault={`${process.env.HTTP_CATS}/404`}/>
            </S.Center>
          </div>)

}

export default StatusCode;