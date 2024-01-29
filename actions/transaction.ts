"use server";
import { revalidatePath } from "next/cache";
import { Category, Transaction, Type, User } from "@/dbConfig/dbConfig";

export const deleteTransaction = async (id: string) => {
  try {
    // console.log(id);
    // const result = await Transaction.find()
    const result = await Transaction.findByIdAndDelete({ _id: id });
    const data = JSON.stringify(result);
    // console.log(data);
    revalidatePath("/mainDashboard");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const findTransactionAndUpdate = async (props: string) => {
  const {
    amount,
    description,
    id,
    type,
  }: { id: string; amount: number; type: string; description: string } =
    JSON.parse(props);
  try {
    const typeName = await Type.findOne({ mode: type });
    const result = await Transaction.findByIdAndUpdate(
      { _id: id },
      { amount: amount, typeId: typeName._id, description: description }
    );
    revalidatePath("/mainDashboard");

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getTransactionData = async (email: string) => {
  try {
    const getUserId = await User.findOne({ email: email });
    // console.log(getUserId);

    const result = await Transaction.find({ userId: getUserId._id })
      .populate("categoryId")
      .populate("typeId")
      .populate("userId");
    // console.log(result);

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = async (prop: string) => {
  const {
    email,
    category,
    type,
    amount,
    description,
    title,
  }: {
    email: string;
    category: string;
    type: string;
    amount: string;
    title: string;
    description: string;
  } = JSON.parse(prop);
  try {
    console.log(email);
    const userId = await User.findOne({ email: email });
    // console.log(userId);
    
    const categoryData = await Category.findOne({ category: category });
    // console.log(categoryData);

    const typeMode = await Type.findOne({ mode: type });
    // console.log(typeMode._id);
    
    const result = await Transaction.create({
      userId: userId._id,
      categoryId: categoryData._id,
      typeId: typeMode._id,
      amount: amount,
      title: title,
      description: description,
    });
    revalidatePath("/mainDashboard");
    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
};
