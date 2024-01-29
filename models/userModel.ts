import mongoose from "mongoose";
const schema = mongoose.Schema;

// interface User {
//   name: String;
//   email: String;
//   password: String;
//   budget: string[];
// }

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  providers: {
    type: String,
    default: "user",
  },
  budget: {
    type: [
      {
        Travel: { type: Number, default: 0, required: false },
        Entertainment: { type: Number, default: 0, required: false },
        Health: { type: Number, default: 0, required: false },
        Household: { type: Number, default: 0, required: false },
        Food: { type: Number, default: 0, required: false },
      },
    ],
    default: [
      {
        Travel: 0,
        Entertainment: 0,
        Health: 0,
        Household: 0,
        Food: 0,
      },
    ],
  },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
