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

import { Height } from "@mui/icons-material"
import { FaAngleDoubleRight } from "react-icons/fa";
;

const CusTable = () => {
  // console.log(MASTER.TableVaues.map((datas)=>{datas.Sno})

  function prepage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function Nextpage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  //   this code is to get object keys

  for (const item of MASTER.TableVaues) {
    const keys = Object.keys(item);
    console.log("Keys:", keys);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const recordperpage = 5;
  const lastindex = currentPage * recordperpage;
  const fisrtindex = lastindex - recordperpage;
  const records = MASTER.TableVaues.slice(fisrtindex, lastindex);
  const npage = Math.ceil(MASTER.TableVaues.length / recordperpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <Grid item xs={12}>
      {/* <Box mt={2} mb={2} ml={8}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={6}>
            <h3 className="Table_heading">Movies</h3>
          </Grid>
          <Grid
            item
            xs={6}
            className="table_search"
            style={{ marginLeft: "-5%" }}
          >

            <div style={{ position: "relative" }}>
              <IoSearch
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                name="search"
                placeholder="      Search.."
                className="Table_search_input"
              />
            </div>
          </Grid>
        </Grid>
      </Box> */}
      <Grid item xs={12}>
        <Box mt={2} mb={2}>
          {" "}
          {/* Margin top and bottom */}
          <table className="table table-borderless" style={{ width: "100%" }}>
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
                    <IoTrash style={{ color: "#4318FF" }} /> {/* Delete icon */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        </Grid>
        <Box mt={2} mb={2} style={{ marginRight: "3%" }}>
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
              <li className="page-item">
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
  );
};

export default CusTable;
