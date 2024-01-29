"use server";

import { User } from "@/dbConfig/dbConfig";
import { revalidatePath } from "next/cache";

export const updateBudget = async (props: string) => {
  const {
    email,
    amount,
    category,
  }: { email: string; amount: string; category: string } = JSON.parse(props);
  //   const pushCategory: Record<string,string> = {};
  //   pushCategory[category] = amount;
  try {
    // console.log(category);/

    const checkArray: any = await User.findOne({ email: email });
    // console.log(checkArray);

    checkArray.budget[0][category] = amount;
    // console.log(checkArray);

    await checkArray.save();
    revalidatePath("/category");
    revalidatePath("/mainDashboard");
    return JSON.stringify(checkArray);
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (email: string) => {
  try {
    const result = await User.findOne({ email: email });
    revalidatePath("/mainDashboard");

    return JSON.stringify(result);
  } catch (error) {
    console.log(error);
  }
};
