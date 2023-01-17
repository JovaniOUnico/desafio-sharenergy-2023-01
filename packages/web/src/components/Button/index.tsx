import React from "react";
import * as B from './style';

type Btn = {
  text: string | undefined,
  onClick: React.MouseEventHandler,
  Type: 'button' | 'submit' | 'reset' | undefined
}

const Button = ({text, onClick, Type}: Btn) => {

  return (
    <B.Button type={Type} onClick={onClick} >{text}</B.Button>
  )
}

export default Button