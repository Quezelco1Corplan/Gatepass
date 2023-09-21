import styled from "styled-components";

export const SignupBody = styled.body`
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
`;

export const SignupContainer = styled.div`
  display: grid;
  border: solid 1px;
  height: 100vh;
  align-content: center;
  justify-content: center;
`;

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  gap: 5px;
  padding: 20px 35px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-bottom-right-radius: 40px;
  border-top-left-radius: 40px;
`;

export const SignupData = styled.div`
  display: grid;
  /* border: 1px solid; */

  & h1 {
    font-size: 45px;
    color: #3c6c91;
  }

  & label {
    font-size: 20px;
  }

  & p {
    margin-top: 5px;
  }

  & input {
    padding: 2px 0px;
    margin-top: 5px;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    font-size: 18px;
    color: #8e8e8e;

    &:focus {
      color: #3c6c91;
    }
  }

  & button {
    height: 35px;
    width: auto;
    justify-content: right;
    border: none;
    font-size: 20px;
    padding: 3px 0px;
    cursor: pointer;
    color: #ffffff;
    background-color: #3c6c91;
    border-radius: 5px;

    &:hover {
      box-shadow: 0 0 4px gray;
    }
  }

  & a {
    padding-left: 7px;
    color: #3c6c91;
    font-weight: 800;
  }

  & span {
    display: flex;
    flex-direction: column;

    &:hover {
      box-shadow: 0 0 4px gray;
    }
  }
`;

export const Signupdiv = styled.div`
  /* border: 1px solid; */
  display: grid;

  /* grid-template-columns: 1fr 1fr;? */
`;

export const Signupdivcontainer = styled.div`
  /* border: 1px solid; */
  gap: 5px;
  display: flex;
  flex-direction: row;
`;

export const error = styled.div`
  color: red;
  font-size: 10px;
`;
export const SignupError = styled.div`
  color: #3c6c91;
  font-size: 15px;
`;
