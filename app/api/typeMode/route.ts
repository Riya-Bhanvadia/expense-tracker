import { Type } from "@/dbConfig/dbConfig";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { mode } = reqBody;
    const result = await Type.create({ mode });
    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (requset: NextRequest) => {
  try {
    const result = await Type.find();
    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};
