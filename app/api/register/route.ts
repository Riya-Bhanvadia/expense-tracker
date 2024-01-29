import { User } from "@/dbConfig/dbConfig";
import { hashPassword } from "@/password-auth/passwordAuth";

import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const reqBody = await request.json();
  const { name, email, password } = reqBody;
 
  
  try {
    const matchEmail = await User.findOne({ email: email });
    if (matchEmail) {
      return Response.json({ message: "email already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const result = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // console.log(result);
    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};

export const GET = async () => {
  try {
    const result = await User.find();
    return Response.json(result);
  } catch (error) {
    console.log(error);
  }
};
