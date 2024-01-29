"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { Grid, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import AddTransactionModal from "../modal/addTransactionModal";



export default function AddTransition() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  return (
    <div style={{ marginLeft: "65%" }}>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="success"
        // sx={{ marginLeft: "80%" }}
      >
        <AddCircleSharpIcon fontSize="small" sx={{ mr: 1 }} /> Add transition
      </Button>
      <AddTransactionModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
      />
      
    </div>
  );
}
