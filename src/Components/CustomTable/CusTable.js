import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styled from "@emotion/styled/macro";
import { Paper } from "@mui/material";
import * as MASTER from "./Tableentries";
import "./CusTable.css";
// import SearchIcon from '@mui/icons-material/Search';
import { IoSearch, IoPencil, IoTrash } from "react-icons/io5";
import { FaAngleDoubleLeft } from "react-icons/fa";

import { Height } from "@mui/icons-material";
import { FaAngleDoubleRight } from "react-icons/fa";
const CusTable = () => {
  // console.log(MASTER.TableVaues.map((datas)=>{datas.Sno})
  const recordperpage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  function prepage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function Nextpage() {
    const totalPages = Math.ceil(filteredRecords.length / recordperpage);
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when search query changes
  };

  const filteredRecords = MASTER.TableVaues.filter((record) =>
    Object.values(record).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  //   this code is to get object keys

  for (const item of MASTER.TableVaues) {
    const keys = Object.keys(item);
    console.log("Keys:", keys);
  }

  const lastindex = currentPage * recordperpage;
  const fisrtindex = lastindex - recordperpage;
  const records = filteredRecords.slice(fisrtindex, lastindex);
  const npage = Math.ceil(filteredRecords.length / recordperpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <Grid container xs={12} sx={{ width: "100%" }}>
      <Grid
        item
        xs={12}
        style={{ backgroundColor: "white", height: "232px", width: "100%",padding:"15px", borderRadius: "15px" }}
      >
        <Grid container className="table_search_grid">
          <Grid item xs={4}>
            <h3 className="Table_heading" style={{ fontSize: "16px" }}>
              Movies
            </h3>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={2} mb={1}>
            {/* <IoSearch /> */}

            <input
              type="text"
              name="search"
              placeholder="      Search.."
              className="Table_search_input"
              onChange={handleSearchChange}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box mt={2} mb={2} sx={{ marginBottom: "0", marginTop: "0" }}>
            {" "}
            {/* Margin top and bottom */}
            <table
              className="table table-borderless custom-table"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  {/*in this value is change in click so will pass through via props */}
                  {MASTER.MovieTableHeaders.map((data) => (
                    <th
                      scope="col"
                      className="thead_data"
                      style={{
                        color: "rgb(178 183 191 / 92%)",
                        borderBottom: "1px solid rgb(217 226 231 / 77%)",
                      }}
                    >
                      {data}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((datas, i) => (
                  <tr key={i}>
                    {Object.keys(datas).map((key) => (
                      <td key={key} style={{ fontWeight: "700" }}>
                        {datas[key]}
                      </td>
                    ))}
                    <td>
                      <IoPencil
                        style={{ marginRight: "10px", color: "#4318FF" }}
                      />{" "}
                      {/* Edit icon */}
                      <IoTrash style={{ color: "#4318FF" }} />{" "}
                      {/* Delete icon */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Box  style={{marginTop:"10px" }}>
          <nav className="nav_pagination">
            <ul className="pagination">
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={prepage}
                >
                  <FaAngleDoubleLeft />
                </a>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={i}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              <li class="page-item">
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={Nextpage}
                >
                  <FaAngleDoubleRight />
                </a>
              </li>
            </ul>
          </nav>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CusTable;
