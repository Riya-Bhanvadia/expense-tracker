// "use client"
import { getTransactionData } from "@/actions/transaction";
import AddLimit from "@/app/components/addLimit/addLimit";
import CategoryCard from "@/app/components/categoryCard/categoryCard";
import axios from "axios";
import React from "react";
import { useSession, getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const CategoryCards = async ({
  searchParams,
}: {
  searchParams?:{session:string};
}) => {
  // if(searchParams){

  // }
  
  
  console.log(JSON.parse(searchParams!?.session));
const session = JSON.parse(searchParams!?.session)
// console.log(session.user.email);

  // const { data: session } = useSession();
  // const session = await getServerSession(authOptions);
  // console.log("::::::::::",session);
  // let category = await axios.get("http://localhost:3000/api/spentCategory");
  const email = session
  // let transactionDetails: [] = await axios.get(
  //   `http://localhost:3000/api/transaction?email=${email}`
  // );
  let transactionDetails: any = await getTransactionData(email);
  // console.log(transactionDetails);

  return (
    <div>
      <CategoryCard data={transactionDetails} />
    </div>
  );
};

export default CategoryCards;
