import React, { useState, useEffect } from "react";
import Sidebar from "../component/sidebar";
import * as HistoryStyles from "../component/styles/History.styles";
import { FaSearch } from "react-icons/fa";
import { BiSolidTrashAlt, BiShow } from "react-icons/bi";
import axios from "axios";

function History() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const filteredData = data.filter(
    (item) =>
      item.names.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dot.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ref_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].checked = !newData[index].checked;
    setData(newData);
  };

  const handleHeaderCheckboxChange = () => {
    const newData = data.map((item) => ({
      ...item,
      checked: !selectAll,
    }));
    setData(newData);
    setSelectAll(!selectAll);
  };

  const refreshPage = () => {
    setRefreshTable((prevRefreshTable) => !prevRefreshTable);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/gatepass", {
        params: {
          refresh: refreshTable ? Date.now() : undefined,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [refreshTable]);

  const handleDelete = (gatepass_id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (!confirm) {
      return;
    }

    axios
      .delete(`http://localhost:3001/gatepass/${gatepass_id}`)
      .then(() => {
        console.log("Item deleted");
        refreshPage();
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };

  return (
    <Sidebar>
      <HistoryStyles.HistoryContainer>
        <HistoryStyles.Box1>
          <HistoryStyles.Headerstyles>
            <h1>Gatepass Records</h1>
          </HistoryStyles.Headerstyles>

          <HistoryStyles.HeaderSearchBar>
            <HistoryStyles.Headersearchbarbox>
              <HistoryStyles.SearchBarinput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </HistoryStyles.Headersearchbarbox>
            <HistoryStyles.Headersearchbarbox>
              <HistoryStyles.SearchBarButton>
                <FaSearch />
              </HistoryStyles.SearchBarButton>
            </HistoryStyles.Headersearchbarbox>
          </HistoryStyles.HeaderSearchBar>
        </HistoryStyles.Box1>

        <HistoryStyles.Box2>
          <HistoryStyles.HistoryTable>
            <HistoryStyles.HistoryTableHead>
              <HistoryStyles.HistoryTableRow>
                <HistoryStyles.HistoryTableHeader>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleHeaderCheckboxChange}
                  />
                </HistoryStyles.HistoryTableHeader>

                <HistoryStyles.HistoryTableHeader>
                  Reference No.
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  Name
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  Destination
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  Date of Travel
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  End Date
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  Time in
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  Time out
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  Status
                </HistoryStyles.HistoryTableHeader>
                <HistoryStyles.HistoryTableHeader>
                  Action
                </HistoryStyles.HistoryTableHeader>
              </HistoryStyles.HistoryTableRow>
            </HistoryStyles.HistoryTableHead>
            <tbody>
              {filteredData.map((item, index) => (
                <HistoryStyles.HistoryTableRow key={index}>
                  <HistoryStyles.HistoryTableData>
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    {item.ref_number}
                  </HistoryStyles.HistoryTableData>

                  <HistoryStyles.HistoryTableData>
                    {item.names}
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    {item.destination}
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    {isNaN(new Date(item.dot).getTime())
                      ? "No assigned date"
                      : new Date(item.dot).toLocaleDateString()}
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    {isNaN(new Date(item.end_date).getTime())
                      ? "No assigned date"
                      : new Date(item.end_date).toLocaleDateString()}
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    {item.start_time}
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    {item.return_time}
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    Status
                  </HistoryStyles.HistoryTableData>
                  <HistoryStyles.HistoryTableData>
                    <HistoryStyles.HistoryAction>
                      <HistoryStyles.HistoryTablebutton1>
                        <button>
                          <BiShow />
                        </button>
                      </HistoryStyles.HistoryTablebutton1>
                      <HistoryStyles.HistoryTablebutton2>
                        <button onClick={() => handleDelete(item.gatepass_id)}>
                          <BiSolidTrashAlt />
                        </button>
                      </HistoryStyles.HistoryTablebutton2>
                    </HistoryStyles.HistoryAction>
                  </HistoryStyles.HistoryTableData>
                </HistoryStyles.HistoryTableRow>
              ))}
            </tbody>
          </HistoryStyles.HistoryTable>
        </HistoryStyles.Box2>
      </HistoryStyles.HistoryContainer>
    </Sidebar>
  );
}

export default History;
