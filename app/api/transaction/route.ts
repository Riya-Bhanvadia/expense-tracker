import { NextRequest } from "next/server";

import { revalidatePath, revalidateTag } from "next/cache";
import { Category, Transaction, Type, User } from "@/dbConfig/dbConfig";

export const POST = async (request: NextRequest) => {
  "use server";
  const reqBody = await request.json();
  const { email, category, type, amount, title, description } = reqBody;

  try {
    const userId = await User.findOne({ email: email });
    const categoryData = await Category.findOne({ category: category });
    // console.log(categoryData);

    const typeMode = await Type.findOne({ mode: type });
    const result = await Transaction.create({
      userId: userId._id,
      categoryId: categoryData._id,
      typeId: typeMode._id,
      amount: amount,
      title: title,
      description: description,
    });
    revalidatePath("/mainDashboard");
    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (request: NextRequest) => {
  // console.log(request.nextUrl.searchParams.get("email"));
  const email = request.nextUrl.searchParams.get("email");

  try {
    const getUserId = await User.findOne({ email: email });
    // console.log(getUserId);

    const result = await Transaction.find({ userId: getUserId._id })
      .populate("categoryId")
      .populate("typeId")
      .populate("userId");
    // console.log(result);

    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};
