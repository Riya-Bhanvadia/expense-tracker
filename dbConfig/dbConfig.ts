// import mongoose from "mongoose";

// export async function connect() {
//   try {
//     console.log("mongo uriiiii",process.env.MONGO_URL);

//     mongoose.connect(process.env.MONGO_URL!);
//     const connection = mongoose.connection;
//     connection.on("connected", () => {
//       console.log("MongoDb connected");
//     });
//     connection.on("error", (err) => {
//       console.log("connection error", err);
//       process.exit();
//     });
//   } catch (error) {
//     console.log(error);
//     console.log("something went wrong");
//   }
// }

import mongoose from "mongoose";
// import transactionModel from "@/models/transactionModel";
import user from "@/models/userModel";
import category from "@/models/spentCategoryModel";
import types from "@/models/paymentTypeModel";
import transactionModel from "@/models/transactionModel";

let mongoString = process.env.MONGO_URL;

if (typeof mongoString === "undefined") {
  throw new Error("mongoString is not defined");
}

if (mongoose.connection.readyState !== 1) {
  mongoose.connect(mongoString);
}

mongoose.Promise = global.Promise;

export const Transaction = transactionModel;
export const User = user;
export const Category = category;
export const Type = types;
