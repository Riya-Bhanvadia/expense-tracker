import { Category } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";





export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { category } = reqBody;
    const result = await Category.create({ category });
    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (request: NextRequest) => {
  try {
    const result = await Category.find();
    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};
