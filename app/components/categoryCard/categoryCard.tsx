"use client";
import {
  Alert,
  Box,
  BoxProps,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import lodash from "lodash";
import AddLimit from "../addLimit/addLimit";
import { GlobalContext } from "@/app/context/filterDateContext";
import Template from "@/app/(dashboard)/progress/templates";
import "@/app/(dashboard)/progress/progress.css";
import { Transaction } from "@/interfaces/transactionInterface";
import HouseSharpIcon from "@mui/icons-material/HouseSharp";
import FastfoodSharpIcon from "@mui/icons-material/FastfoodSharp";
import MovieCreationSharpIcon from "@mui/icons-material/MovieCreationSharp";
import SubwaySharpIcon from "@mui/icons-material/SubwaySharp";
import HealthAndSafetySharpIcon from "@mui/icons-material/HealthAndSafetySharp";
import CategoryTable from "../tableByCat/CategoryTable";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,

        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#C4E9D7",
        color: (theme) => (theme.palette.mode === "dark" ? "grey.300" : "blue"),
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "#C4E9D7",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

const CategoryCard = (props: { data: string }) => {
  const data: Transaction[] = JSON.parse(props.data);
  const [openTable, setOpenTable] = useState(false);
  const [limitClicked, setLimitClicked] = useState(false);
  const [categoryData, setCategoryData] = useState<Transaction[]>([]);
  let amountSpent: number;
  // const [amount, setAmount] = useState();
  const { handleOpen, setLimitCategory } = useContext(GlobalContext);

  const handleLimit = (i: { category: "Travel" | "Entertainment" | "Food" | "Household" | "Health" }) => {
    handleOpen();
    setLimitCategory(i.category);

    // setAmountSpent(amountSpent);
  };
  const handleOpenTable = (i: any) => {
    setOpenTable(true);
    // console.log(i);
    let val = [];
    val = data?.filter((k) => k.categoryId.category === i.category);
    // console.log(val);

    setCategoryData(val);
  };
  // console.log("-------------------",data);
  
  const catData: Transaction[] = lodash.uniqWith(data, (arrVal, othVal) => {
    // console.log(arrVal);
    
    return arrVal.categoryId.category === othVal.categoryId.category;
  });

  return (
    <div style={{ width: "100%" }}>
      <Grid
        container
        // spacing={1}
        direction="row"
        // justify="space-between"
        // alignItems="center"
        // bgcolor= 'linear-gradient(to right bottom, #430089, #82ffa1)'
        style={{
          background: "linear-gradient(to right bottom, #ddd6f3 , #faaca8)",
          minHeight: "100vh",
        }}
      >
        <Grid
          direction="row"
          alignItems="center"
          container
          maxWidth={openTable ? "60%" : "100%"}
          sx={{ marginBottom: "80px" }}
        >
          {catData?.map((i) => (
            <Item key={i._id}>
              <Card
                sx={{
                  minWidth: 280,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                  bgcolor: "#DAF0D5",
                  cursor: "pointer",
                  height: "220px",
                }}
              >
                <CardContent onClick={() => handleOpenTable(i.categoryId)}>
                  {i.categoryId.category === "Food" ? (
                    <FastfoodSharpIcon style={{ color: "orange" }} />
                  ) : i.categoryId.category === "Household" ? (
                    <HouseSharpIcon style={{ color: "brown" }} />
                  ) : i.categoryId.category === "Entertainment" ? (
                    <MovieCreationSharpIcon style={{ color: "green" }} />
                  ) : i.categoryId.category === "Health" ? (
                    <HealthAndSafetySharpIcon style={{ color: "red" }} />
                  ) : (
                    <SubwaySharpIcon style={{ color: "blue" }} />
                  )}
                  <Typography variant="h5" component="div">
                    {i.categoryId.category}
                  </Typography>

                  <Typography variant="body1">
                    Amount Spent:{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {data
                        ?.filter(
                          (item) =>
                            item.categoryId.category === i.categoryId.category
                        )
                        .reduce(
                          (accumulator: number, currValue) =>
                            (amountSpent = accumulator + currValue.amount),
                          0
                        )}
                    </span>
                    <br />
                  </Typography>
                </CardContent>
                {i.userId.budget[0][i.categoryId.category] !== 0 && (
                  <div
                    className="progressbar-container"
                    style={{ marginLeft: "5px" }}
                  >
                    <div className="progressbar">
                      {/* {amountSpent / i.userId.budget[0][i.categoryId.category]} */}
                      <Template
                        value={
                          (amountSpent /
                            i.userId.budget[0][i.categoryId.category]) *
                          100
                        }
                      >
                        <div></div>
                      </Template>
                    </div>
                  </div>
                )}
                <div>
                  {amountSpent >=
                  i.userId.budget[0][i.categoryId.category] -
                    i.userId.budget[0][i.categoryId.category] * 0.06 ? (
                    <Alert
                      severity="error"
                      style={{
                        height: "36px",
                        padding: "0px",
                        marginTop: "5px",
                        border: "1px solid red",
                      }}
                    >
                      You have almost reacted the limit
                    </Alert>
                  ) : (
                    <div
                      style={{
                        height: "36px",
                        padding: "0px",
                        marginTop: "5px",
                      }}
                    ></div>
                  )}
                </div>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleLimit(i.categoryId)}
                  >
                    Add Limit
                  </Button>
                  <Typography style={{ marginLeft: "18%" }}>
                    Total Limit:
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      {i.userId.budget[0][i.categoryId.category]}
                    </span>
                  </Typography>
                </CardActions>
              </Card>
            </Item>
          ))}
        </Grid>
        {openTable && (
          <Grid width="40%" container marginTop="25px">
            <CategoryTable
              categoryData={categoryData}
              setOpenTable={setOpenTable}
            />
          </Grid>
        )}
      </Grid>
      <AddLimit data={data} setLimitClicked={setLimitClicked} limitClicked={limitClicked}/>
    </div>
  );
};

export default CategoryCard;
