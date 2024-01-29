import mongoose from "mongoose";
const schema = mongoose.Schema;

const typeSchema = new schema({
  mode: {
    type: String,
    enum: ["online", "cash"],
  },
});

const Type =
  mongoose.models.transactionTypes ||
  mongoose.model("transactionTypes", typeSchema);
export default Type;
