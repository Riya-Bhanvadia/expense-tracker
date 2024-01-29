"use client";
import React, { useContext, useState } from "react";
import AddTransition from "../addTransition/addTransition";
import { Grid, MenuItem, TextField } from "@mui/material";
import { GlobalContext } from "@/app/context/filterDateContext";
import { Transaction } from "@/interfaces/transactionInterface";

const TableHeader = () => {
  const [timeData, setTimeData] = useState("");
  const time1 = ["1 week", "30 days", "1 year", "All"];

  const { setTime } = useContext(GlobalContext);

  return (
    <Grid container style={{ display: "flex", marginTop: "20px" }}>
      <Grid item>
        <TextField
          //   id="outlined-select-currency"
          select
          label="Select"
          defaultValue="Select"
          // helperText="select time"
          value={timeData}
          onChange={(e) => {
            setTimeData(e.target.value);
            setTime(e.target.value);
          }}
          variant="standard"
          style={{ marginLeft: "80px", width: "100px" }}
        >
          <MenuItem disabled>Select</MenuItem>
          {time1.map((i, index) => (
            <MenuItem key={index} value={i}>
              {i}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <AddTransition />
    </Grid>
  );
};

export default TableHeader;
