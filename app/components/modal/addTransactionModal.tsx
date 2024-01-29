import { createTransaction } from "@/actions/transaction";
import { GlobalContext } from "@/app/context/filterDateContext";
import { Transaction } from "@/interfaces/transactionInterface";
import lodash from "lodash";
import {
  Box,
  Button,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import AddLimit from "../addLimit/addLimit";
import { getUserData } from "@/actions/user";

interface CategoryType {
  _id: string;
  category: string;
}
interface ModeType {
  _id: string;
  mode: string;
}

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

interface Formdata {
  // email: string | null | undefined;
  title: string;
  amount: string;
  category: "Travel" | "Entertainment" | "Food" | "Household" | "Health";
  type: string;
  description: string;
}
interface Budget {
  Travel: number;
  Entertainment: number;
  Food: number;
  Household: number;
  Health: number;
}

const AddTransactionModal = (props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}) => {
  const { open, setOpen, handleClose } = props;
  const { transactionData, handleOpen, setLimitCategory } =
    useContext(GlobalContext);
  const { data: session } = useSession();

  const sessionEmail = session?.user?.email;

  const [category, setCategory] = React.useState<string[]>([]);
  const [paymentMode, setPaymentMode] = React.useState<ModeType[]>([]);
  const [error, setError] = useState("");
  const [limitClicked, setLimitClicked] = useState(false);
  const [budget, setBudget] = useState<Budget>({
    Travel: 0,
    Entertainment: 0,
    Food: 0,
    Household: 0,
    Health: 0,
  });
  const [formData, setFormData] = React.useState<Formdata>({
    // email: sessionEmail,
    title: "",
    amount: "",
    category: "Travel",
    type: "",
    description: "",
  });

  const catData: Transaction[] = lodash.uniqWith(
    transactionData,
    (arrVal, othVal) => {
      return arrVal.categoryId.category === othVal.categoryId.category;
    }
  );
  // console.log(catData);

  React.useEffect(() => {
    console.log("--------------- ");

    // axios.get("http://localhost:3000/api/spentCategory").then((res) => {
    //   console.log(res);
    //   setCategory(res.data);
    // });
    if (sessionEmail) {
      console.log("aaaaaaaaaaaaaaaaaa");
      const r = getUserData(sessionEmail)
        .then((res: any) => {
          let s = JSON.parse(res);
          // console.log(s);

          setCategory(Object.keys(s.budget[0]));
          setBudget(s.budget[0]);
        })
        .catch((error) => console.log(error));
    }

    axios.get("http://localhost:3000/api/typeMode").then((res) => {
      // console.log(res);
      setPaymentMode(res.data);
    });
  }, [sessionEmail, limitClicked]);
  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async () => {
    // console.log(formData);
    setLimitClicked(!limitClicked);

    // await createTransaction(JSON.stringify(formData));

    // if (transactionData && transactionData.length !== 0) {
    // console.log("136",budget[formData.category]);

    if (budget[formData.category] === 0) {
      // console.log(budget[formData.category]);

      handleOpen();
      setLimitCategory(formData.category);
    } else if (transactionData && transactionData.length !== 0) {
      const amount = transactionData
        ?.filter((i) => i.categoryId.category === formData.category)
        .reduce((a, b) => a + b.amount, 0);
      // console.log(Number(amount) + Number(formData.amount));
      if (
        Number(amount) + Number(formData.amount) >
        transactionData[0].userId.budget[0][formData.category]
      ) {
        setError(`Total spent amount excedding the ${formData.category} limit`);
      } else {
        const obj = {
          email: sessionEmail,
          title: formData.title,
          amount: formData.amount,
          category: formData.category,
          type: formData.type,
          description: formData.description,
        };

        const a: any = await createTransaction(JSON.stringify(obj));

        setFormData({
          // email: sessionEmail!,
          title: "",
          amount: "",
          category: "Travel",
          type: "",
          description: "",
        });
        setError("");
        setOpen(false);
      }
    } else if (budget[formData.category] < Number(formData.amount)) {
      setError("Recheck amount");
    } else {
      const obj = {
        email: sessionEmail,
        title: formData.title,
        amount: formData.amount,
        category: formData.category,
        type: formData.type,
        description: formData.description,
      };

      const a: any = await createTransaction(JSON.stringify(obj));

      setFormData({
        // email: sessionEmail!,
        title: "",
        amount: "",
        category: "Travel",
        type: "",
        description: "",
      });
      setError("");
      setOpen(false);
    }

    // const amount = transactionData
    //   ?.filter((i) => i.categoryId.category === formData.category)
    //   .reduce((a, b) => a + b.amount, 0);
    // console.log(Number(amount) + Number(formData.amount));
    // if (transactionData) {
    //   if (
    //     Number(amount) + Number(formData.amount) >
    //     transactionData[0].userId.budget[0][formData.category]
    //   ) {
    //     setError(`Total spent amount excedding the ${formData.category} limit`);
    //   } else {

    //   }
    // }

    // } else {
    //   handleOpen();
    //   setLimitCategory(formData.category);
    // }

    // const amount = transactionData
    //   ?.filter((i) => i.categoryId.category === formData.category)
    //   .reduce((a, b) => a + b.amount, 0);
    // console.log(Number(amount) + Number(formData.amount));
    // if (transactionData) {
    //   if (
    //     Number(amount) + Number(formData.amount) >
    //     transactionData[0].userId.budget[0][formData.category]
    //   ) {
    //     setError(`Total spent amount excedding the ${formData.category} limit`);
    //   } else {
    //     await createTransaction(JSON.stringify(formData));
    //     setFormData({
    //       email: sessionEmail!,
    //       title: "",
    //       amount: "",
    //       category: "Travel",
    //       type: "",
    //       description: "",
    //     });
    //     setError("");
    //     setOpen(false);
    //   }
    // }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Transaction
          </Typography>
          <div>
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
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
          <div style={{ marginTop: "15px" }}>
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
              {category
                .filter((i) => i !== "_id")
                .map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </TextField>
          </div>
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
          <span style={{ color: "red" }}>{error}</span>
          <div style={{ marginTop: "15px" }}>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Add
            </Button>
          </div>
        </Box>
      </Modal>
      <AddLimit
        data={transactionData!}
        setLimitClicked={setLimitClicked}
        limitClicked={limitClicked}
      />
    </div>
  );
};

export default AddTransactionModal;
