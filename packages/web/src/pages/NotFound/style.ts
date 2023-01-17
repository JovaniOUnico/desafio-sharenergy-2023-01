import styled from "styled-components";
import fundo from './fundo.jpg'

type ContainerProps = {
  direction: 'row' | 'column';
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: center;
  vertical-align: center;
  padding: 20px;

  text-align: center;
`;

export const H1 = styled.h1`
  font-size: 108px;
  color: black;
  mix-blend-mode: screen;
  background-color: #f0f2f5;
`;

export const Backdrop = styled.div`
  width: fit-content;
  background: url('${fundo}') center;
  box-shadow: 0px 0px 40px #fff;
  animation: myAnim 20s ease 0s infinite alternate forwards;

  @keyframes myAnim {
    0%,
    100% {
      background-position: left;
    }
  
    15% {
      background-position: top;
    }
  
    30% {
      background-position: left;
    }
  
    45% {
      background-position: right;
    }
  
    60% {
      background-position: bottom;
    }
  
    75% {
      background-position: right;
    }
  }
`;