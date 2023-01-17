import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0px;
    padding: 0px;
    border: 0px;
  }

  body {
    heigth: 100vh;
    background-color: #f0f2f5;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default GlobalStyle