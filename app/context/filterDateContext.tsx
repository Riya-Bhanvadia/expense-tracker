"use client";
import { Transaction } from "@/interfaces/transactionInterface";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type Limit = {
  _id: string;
  category: string;
};

interface ContextProps {
  time: string;
  setTime: Dispatch<SetStateAction<string>>;
  openLimit: boolean;
  setOpenLimit: Dispatch<SetStateAction<boolean>>;
  handleOpen: () => void;
  handleClose: () => void;
  limitCategory: "Travel" | "Entertainment" | "Food" | "Household" | "Health";
  setLimitCategory: Dispatch<SetStateAction<"Travel" | "Entertainment" | "Food" | "Household" | "Health">>;
  amountSpent: number;
  setAmountSpent: Dispatch<SetStateAction<number>>;
  transactionData: Transaction[] | null;
  setTransactionData: Dispatch<SetStateAction<Transaction[] | null>>;
}

export const GlobalContext = createContext<ContextProps>({
  time: "",
  setTime: (): string => "",
  openLimit: false,
  setOpenLimit: (): boolean => false,
  handleOpen: () => null,
  handleClose: () => null,
  limitCategory: "Travel",
  setLimitCategory: (): string => "",
  amountSpent: 0,
  setAmountSpent: (): number => 0,
  transactionData: null,
  setTransactionData: () => null,
});

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [time, setTime] = useState("");
  const [openLimit, setOpenLimit] = useState(false);
  const handleOpen = () => setOpenLimit(true);
  const handleClose = () => setOpenLimit(false);
  const [limitCategory, setLimitCategory] = useState<"Travel" | "Entertainment" | "Food" | "Household" | "Health">("Travel");
  const [amountSpent, setAmountSpent] = useState(0);
  const [transactionData, setTransactionData] = useState<Transaction[] | null>(
    null
  );
  // console.log(time);

  return (
    <GlobalContext.Provider
      value={{
        time,
        setTime,
        openLimit,
        setOpenLimit,
        handleOpen,
        handleClose,
        limitCategory,
        setLimitCategory,
        amountSpent,
        setAmountSpent,
        transactionData,
        setTransactionData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
