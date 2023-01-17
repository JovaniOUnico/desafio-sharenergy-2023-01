import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #f0f2f5;
  z-index: 3;
  position: absolute;
  top: 0px;
  width: 100%;
`;

export const LoadContainer = styled.div`
  margin-top: 50vh;
  font-size: 120px;

  svg {
    animation: rotate 2s ease 0s infinite normal backwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }
`;