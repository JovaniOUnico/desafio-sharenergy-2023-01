import styled from "styled-components";

export const NavBar = styled.nav`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  ul:not(.user-config) {
    list-style: none;
    display: flex;
    flex-direction: row;
    box-shadow: 0 0 8px #222;
    border-radius: 0px 20px 0px 20px;
  }

  ul li a {
    padding: 10px 15px;
    color: white;
    text-decoration: none;
  }

  ul li:first-of-type {
    border-radius: 0px 0px 0px 20px;
  }

  ul li:last-of-type {
    border-radius: 0px 20px 0px 0px;
  }

  ul.user-config li {
    border-radius: 5px;
  }

  ul li {
    padding: 10px 15px;
    background: linear-gradient(#3498db, #2980b9);
    color: white;
    font-weight: bolder;
    cursor: pointer;
  }

  ul li:hover {
    background: linear-gradient(#3498db, #27ae60);
  }

  ul li.logout {
    background: linear-gradient(#e74c3c, #e74c3c);
    color: white;
  }

  ul li.logout:hover {
    background: linear-gradient(#c0392b, #c0392b);
    color: white;
  }
`;