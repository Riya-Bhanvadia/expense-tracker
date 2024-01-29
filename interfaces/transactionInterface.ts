export interface Transaction {
  amount: number;
  categoryId: {
    _id: string;
    category: "Travel" | "Entertainment" | "Food" | "Household" | "Health";
  };
  typeId: {
    mode: string;
    _id: string;
  };
  userId: {
    budget: {
      Travel: number;
      Food: number;
      Entertainment: number;
      Health: number;
      Household: number;
      _id: string;
    }[];
    name: string;
    email: string;
    password: string;
    _id: string;
  };
  _id: string;
}
