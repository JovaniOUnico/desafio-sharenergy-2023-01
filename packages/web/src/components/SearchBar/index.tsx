import React from "react";
import * as S from './styles';

type Props = {
  type: string,
  placeholder: string,
  value: string,
  onChange: React.ChangeEventHandler
}

const SearchBar = ({type, placeholder, value, onChange}: Props) => {

  return (<>
            <S.Search type={type}
                      placeholder={placeholder}
                      value={value}
                      onChange={onChange} />
          </>);
}

export default SearchBar;