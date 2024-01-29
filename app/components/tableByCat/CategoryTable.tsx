import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import { Transaction } from "@/interfaces/transactionInterface";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

export default function CategoryTable(props: {
  categoryData: Transaction[];
  setOpenTable: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { categoryData, setOpenTable } = props;
  // console.log(categoryData);

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          maxHeight: "80vh",
          marginRight: "60px",
          boxShadow:
            " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <TableContainer sx={{ maxHeight: 400 }}>
          <Typography variant="h6" textAlign="center">
            Category: {categoryData[0].categoryId.category}
            <IconButton
              style={{ float: "right" }}
              onClick={() => setOpenTable(false)}
            >
              <ClearSharpIcon />
            </IconButton>
          </Typography>
          <Table sx={{ minWidth: 350 }} aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Title</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Amount
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryData.map((row: any) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">
                    {row.updatedAt.slice(0, 10)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
