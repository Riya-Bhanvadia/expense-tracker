"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import HouseSharpIcon from "@mui/icons-material/HouseSharp";
import FastfoodSharpIcon from "@mui/icons-material/FastfoodSharp";
import MovieCreationSharpIcon from "@mui/icons-material/MovieCreationSharp";
import SubwaySharpIcon from "@mui/icons-material/SubwaySharp";
import HealthAndSafetySharpIcon from "@mui/icons-material/HealthAndSafetySharp";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { deleteTransaction } from "@/actions/transaction";
import EditTransactionModal from "../editTransactionModal/editTransactionModal";
import { Types } from "mongoose";
import { GlobalContext } from "@/app/context/filterDateContext";
import { Tooltip } from "@mui/material";
import { useSession } from "next-auth/react";

interface createData {
  _id: string;
  userId: string;
  categoryId: { _id: Types.ObjectId; category: string };
  amount: number;
  typeId: { _id: Types.ObjectId; mode: string };
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

function Row(props: { expenseData: createData; handleOpen: any }) {
  const { expenseData, handleOpen } = props;
  const [open, setOpen] = React.useState(false);
 
  

  const handleDelete = (i: string) => {
    // console.log(i);

    deleteTransaction(i);
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ padding: "0px" }}>
          <Tooltip title="show description">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell component="th" scope="row" style={{ paddingLeft: "0px" }}>
          <IconButton style={{ cursor: "default", color: "black" }}>
            {expenseData.categoryId.category === "Food" ? (
              <FastfoodSharpIcon />
            ) : expenseData.categoryId.category === "Household" ? (
              <HouseSharpIcon />
            ) : expenseData.categoryId.category === "Entertainment" ? (
              <MovieCreationSharpIcon />
            ) : expenseData.categoryId.category === "Health" ? (
              <HealthAndSafetySharpIcon />
            ) : (
              <SubwaySharpIcon />
            )}
          </IconButton>
          {expenseData.categoryId.category}
        </TableCell>
        <TableCell align="center">{expenseData.amount}</TableCell>
        <TableCell align="center">{expenseData.typeId.mode}</TableCell>
        <TableCell align="center">{expenseData.title}</TableCell>
        <TableCell align="center">
          {expenseData.updatedAt.slice(0, 10)}
        </TableCell>
        <TableCell align="center" sx={{ margin: "0px" }}>
          {/* <Stack direction="row" spacing={1}> */}
          <Tooltip title="delete">
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDelete(expenseData._id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="edit">
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => handleOpen(expenseData)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          {/* </Stack> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Typography gutterBottom component="div">
                {expenseData.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props: { data: string }) {
  const data: [] = JSON.parse(props.data);
  const { setTransactionData } = React.useContext(GlobalContext);
  const {data:session} = useSession()
  console.log(session);
  // const [open, setOpen] = React.useState(false);
  // console.log("hiiiiiiiiiiiiiiiiiiii", data);
  // console.log(data);
  
  React.useEffect(() => {
    setTransactionData(data);
  }, []);
  // const [expenseData, setExpenseData] = React.useState([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [editDataId, setEditDataId] = React.useState("");
  const { time } = React.useContext(GlobalContext);
  // console.log(time);
  let currentDate = new Date();
  let lastWeekDate: Date;

  const handleOpen = (i: any) => {
    setOpenModal(true);
    setEditDataId(i);
  };
  const handleClose = () => setOpenModal(false);

  return (
    <TableContainer
      component={Paper}
      style={{
        marginTop: "2%",
        width: "80%",
        marginLeft: "10%",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginRight: "10%",
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left" style={{ fontWeight: "bold" }}>
              Category
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Amount
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              PaymentMode
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Title
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Date
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Editable
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {console.log(typeof data)
          } */}
          {data
            .filter((i: any) => {
              if (time === "1 week") {
                lastWeekDate = new Date(
                  currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
                );
              }
              if (time === "30 days") {
                lastWeekDate = new Date(
                  currentDate.getTime() - 30 * 24 * 60 * 60 * 1000
                );
              }
              if (time === "1 year") {
                lastWeekDate = new Date(
                  currentDate.getTime() - 365 * 24 * 60 * 60 * 1000
                );
              }
              if (time === "" || time === "All") {
                return i;
              }
              const t: Date = new Date(i.updatedAt);
              const today = new Date();

              return (
                t.getTime() < today.getTime() &&
                lastWeekDate.getTime() < t.getTime()
              );
            })
            .map((expenseData, index) => (
              <Row
                key={index}
                expenseData={expenseData}
                handleOpen={handleOpen}
                // open={open}
                // setOpen={setOpen}
              />
            ))}
        </TableBody>
      </Table>
      {openModal && (
        <EditTransactionModal
          open={openModal}
          setOpen={setOpenModal}
          handleClose={handleClose}
          id={editDataId}
        />
      )}
    </TableContainer>
  );
}
