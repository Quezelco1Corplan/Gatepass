import styled from "styled-components";

export const UMBody = styled.div`
  box-sizing: border-box;
  font-family: sans-serif;
`;

export const UMContainer = styled.div`
  background: #ffffff;
  display: grid;
  grid-template-rows: 1fr;
  gap: 10px;
`;

export const UMbox1 = styled.div`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 15px 30px;

  & h1 {
    color: #3c6c91;
    font-size: 35px;
  }
`;

export const UMbox2 = styled.div`
  display: grid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  background: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-height: 82vh;
  overflow: overlay;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 0px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;

export const UMTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  border: none;
`;

export const UMTableHead = styled.thead`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  background-color: #16558f;
  height: 50px;
  text-align: left;
  color: #e3f3fb;
  font-size: 15px;
`;

export const UMTableth = styled.th`
  padding: 10px 10px;
  border-collapse: collapse;
  border: none;
`;

export const UMTabletd = styled.td`
  padding: 10px;
  border-collapse: collapse;
  border: none;
  border-bottom: 1px solid #ccc;
  color: gray;
  font-size: 13px;

  & button {
    background-color: transparent;
    border: none;
    color: gray;
    cursor: pointer;
    font-size: 20px;
  }
`;

export const UMTablebutton1 = styled.div`
  & :hover {
    color: BLUE;
  }
`;

export const UMablebutton2 = styled.div`
  & :hover {
    color: red;
  }
`;

export const UMAction = styled.div`
  /* border: 1px solid; */
  display: flex;
  align-items: left;
  justify-content: space-evenly;

  & button {
    width: 100%;
  }
`;
