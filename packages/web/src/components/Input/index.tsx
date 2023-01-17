import React from 'react';
import * as S from './style';

type Props = {
  type: string,
  placeholder: string,
  value: string,
  onChange: React.ChangeEventHandler
}

const Input = ({type, placeholder, value, onChange}: Props) => {

  return (<S.Input 
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange} />)

}

export default Input;