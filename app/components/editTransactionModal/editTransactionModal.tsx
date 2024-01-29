"use client";
import { findTransactionAndUpdate } from "@/actions/transaction";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  m: 1,
  width: "25ch",
};
interface ModeType {
  _id: string;
  mode: string;
}

const EditTransactionModal = (props: any) => {
  const { open, setOpen, handleClose, id } = props;
  // console.log(id);

  const [paymentMode, setPaymentMode] = useState<ModeType[]>([]);
  const [formData, setFormData] = useState({
    amount: id.amount,
    type: id.typeId.mode,
    description: id.description,
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const data = {
      id: id._id,
      amount: formData.amount,
      type: formData.type,
      description: formData.description,
    };
    await findTransactionAndUpdate(JSON.stringify(data));
    setOpen(false);
  };
  React.useEffect(() => {
    console.log("--------------- ");

    axios.get("http://localhost:3000/api/typeMode").then((res) => {
      // console.log(res);
      setPaymentMode(res.data);
    });
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component="form">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Edit Transaction
        </Typography>
        {/* <div>
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div> */}
        <Typography>{id.categoryId.category}</Typography>
        <Typography>{id.title}</Typography>
        <div style={{ marginTop: "15px" }}>
          <TextField
            id="standard-basic"
            label="Amount"
            type="number"
            variant="standard"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        {/* <div style={{ marginTop: "15px" }}>
            <TextField
              //   id="standard-select-currency"
              select
              label="Select"
              defaultValue="Select"
              helperText="select category"
              variant="standard"
              value={formData.category}
              name="category"
              onChange={handleChange}
            >
              <MenuItem value="Select" disabled>
                Select
              </MenuItem>
              {category.map((option, index) => (
                <MenuItem key={index} value={option.category}>
                  {option.category}
                </MenuItem>
              ))}
            </TextField>
          </div> */}
        <div style={{ marginTop: "15px" }}>
          <TextField
            //   id="standard-select-currency"
            select
            label="Select"
            defaultValue="Select"
            helperText="select paymentmode"
            variant="standard"
            value={formData.type}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value="Select" disabled>
              Select
            </MenuItem>
            {paymentMode?.map((option) => (
              <MenuItem key={option._id} value={option.mode}>
                {option.mode}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div style={{ marginTop: "15px" }}>
          <TextField
            id="standard-multiline-flexible"
            label="Add Description*"
            multiline
            maxRows={4}
            variant="standard"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div style={{ marginTop: "15px" }}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Edit
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditTransactionModal;
