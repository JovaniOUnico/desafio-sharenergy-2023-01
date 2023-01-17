import React from "react";
import * as B from './style';

type Btn = {
  text: string | undefined,
  onClick: React.MouseEventHandler,
  Type: 'button' | 'submit' | 'reset' | undefined
}

const PageButton = ({text, onClick, Type}: Btn) => {

  return (
    <B.PageButton type={Type} onClick={onClick} >{text}</B.PageButton>
  )
}

export default PageButton