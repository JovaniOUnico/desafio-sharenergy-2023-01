import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  button {
    padding: 0px 10px;
    margin: 10px;
    width: fit-content;
    word-break: keep-all;
    white-space: nowrap;
  }
`;

export const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;

  img {
    max-width: 400px;
  }
`;