import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  transition: 0.5s;
  align-items: center;

  div {
    padding: 10px;
  }

  .flex-row {
    width: calc(100% / 5);
    padding: 0.5em 0.5em;
    word-wrap: break-word;
  }

  .flex-row:first-of-type {
    width: fit-content;
  }
`;

export const Img = styled.img`

`;