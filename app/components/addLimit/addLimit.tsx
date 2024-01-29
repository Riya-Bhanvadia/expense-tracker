"use client";
import { getUserData, updateBudget } from "@/actions/user";
import { GlobalContext } from "@/app/context/filterDateContext";
import { Transaction } from "@/interfaces/transactionInterface";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddLimit = (props: {
  data: Transaction[];
  setLimitClicked: React.Dispatch<React.SetStateAction<boolean>>;
  limitClicked: boolean;
}) => {
  const { data, setLimitClicked, limitClicked } = props;
  const [userData, setUserData] = useState();
  const { data: session } = useSession();
  const sessionEmail = session?.user?.email;
  let budget;
  useEffect(() => {
    if (sessionEmail) {
      const d = getUserData(sessionEmail)
        .then((res: any) => {
          // console.log(JSON.parse(res));
          setUserData(JSON.parse(res));
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const {
    openLimit,
    handleClose,
    limitCategory,
    setTransactionData,
    transactionData,
  } = useContext(GlobalContext);
  // console.log(transactionData[0]?.userId.budget[0][limitCategory]);

  let a: number;
  a = data
    ?.filter((i) => i.categoryId.category === limitCategory)
    .reduce((a: number, b) => a + b.amount, 0);
  // console.log(a);

  const [limit, setLimit] = useState<number>(0);
  const [error, setError] = useState("");

  const handleClick = async () => {
    const obj: {
      email: string;
      amount: number;
      category: string;
    } = {
      email: sessionEmail!,
      amount: limit,
      category: limitCategory,
    };
    const l = Number(limit);
    if (a) {
      if (l < a) {
        setError("your total expense till now is more then limit!!!");
      } else {
        setError("");
        await updateBudget(JSON.stringify(obj));
        console.log("---------clicked");
        
        if (transactionData && transactionData.length !== 0) {
          transactionData[0].userId.budget[0][limitCategory] = limit;
          setTransactionData(transactionData);
        }
        setLimitClicked(!limitClicked);
        handleClose();
        setLimit(0);
      }
    } else {
      setError("");
      await updateBudget(JSON.stringify(obj));

      if (transactionData && transactionData?.length !== 0) {
        transactionData[0].userId.budget[0][limitCategory] = limit;
        setTransactionData(transactionData);
      }
      setLimitClicked(!limitClicked);
      handleClose();
      setLimit(0);
    }
  };
  return (
    <div>
      <Modal
        open={openLimit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Set {limitCategory} Limit
          </Typography>
          <br />
          <TextField
            required
            id="outlined-required"
            label="Add limit"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={() => handleClick()}
          >
            Add
          </Button>
          <br />
          <span style={{ color: "red" }}>{error}</span>
        </Box>
      </Modal>
    </div>
  );
};

export default AddLimit;
