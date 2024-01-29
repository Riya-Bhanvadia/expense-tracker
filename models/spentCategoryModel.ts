import mongoose from "mongoose";
const schema = mongoose.Schema;

const spentCategory = new schema({
  category: {
    type: String,
    enum: ["Travel", "Entertainment", "Food", "Health", "Household"],
  },
});

const Spent =
  mongoose.models.spentCategorys ||
  mongoose.model("spentCategorys", spentCategory);
export default Spent;
