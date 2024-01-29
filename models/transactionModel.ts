import mongoose from "mongoose";
const schema = mongoose.Schema;

const transactionSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    ref: "users",
  },
  categoryId: {
    type: schema.Types.ObjectId,
    ref: "spentCategorys",
  },
  typeId: {
    type: schema.Types.ObjectId,
    ref: "transactionTypes",
  },
  amount: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
},{timestamps: true});

const Transaction =
  mongoose.models.transactions ??
  mongoose.model("transactions", transactionSchema);

export default Transaction;
