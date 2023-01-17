import styled from "styled-components";

export const Search = styled.input`
  display: block;
  width: calc(100% - 24px); /*20px [ left & Right ] padding + 4px border [ left & Right ] */ 
  font-size: 18px;
  font-weight: 600;
  padding: 10px;
  margin: 10px 0px;
  border: 2px solid #3498db;
  border-radius: 5px;
`;