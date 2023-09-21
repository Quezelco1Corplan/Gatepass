import styled from "styled-components";

export const HistoryContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  gap: 5px;
  font-family: "Open Sans", sans-serif;
`;

//Box 1
export const Box1 = styled.div`
  background: #ffffff;
  padding-left: 5px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const Headerstyles = styled.div`
  padding: 10px 10px;
  color: gray;
`;

export const HeaderSearchBar = styled.div`
  padding-right: 10px;
  display: flex;
`;

export const SearchBarinput = styled.input`
  width: 100%;
  border: 2px solid #ccc;
  border-right: none;
  padding: 5px;
  height: 20px;
  outline: none;
  color: #ccc;

  &:focus {
    color: gray;
  }
`;

export const SearchBarButton = styled.button`
  padding-left: 2px 1px;
  width: 40px;
  height: 34px;
  border: 1px solid #ccc;
  background: #ccc;
  text-align: center;
  color: #fff;
  border-bottom-right-radius: 25px;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    background-color: gray;
  }
`;

// box 2
export const Box2 = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 1px 1px 10px 2px #dadada;
  max-height: 82vh;
  overflow: overlay;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: 1fr;

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

export const HistoryTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  /* border-buttom:  */
`;

export const HistoryTableRow = styled.tr``;

export const HistoryTableHead = styled.thead`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  background-color: #16558f;
  height: 50px;
  text-align: left;
  color: #e3f3fb;
  font-size: 15px;
  border: 1px solid;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  & input {
    background-color: transparent;
    border-bottom: 1px solid #ffffff;
    outline: none;
    color: #e3f3fb;

    &:focus {
      color: #e3f3fb;
    }
  }
`;

export const HistoryTableHeader = styled.th`
  padding: 10px 10px;
`;

export const HistoryTableData = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  color: gray;
  font-size: 13px;

  & button {
    background-color: none;
    border: none;
  }
`;

export const HistoryAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  & button {
    width: 100%;
  }
`;

export const HistoryActionButton = styled.button`
  background-color: red;
`;
