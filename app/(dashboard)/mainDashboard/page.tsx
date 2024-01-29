import { getTransactionData } from "@/actions/transaction";
import AddTransition from "@/app/components/addTransition/addTransition";
import CollapsibleTable from "@/app/components/table/table";
import Table from "@/app/components/table/table";
import TableHeader from "@/app/components/tableHeader/tableHeader";
import axios from "axios";
import React from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const MainDashboard = async ({
  searchParams,
}: {
  searchParams?:{email:string};
}) => {
  const session:any = await getServerSession(authOptions);
console.log("session........",session.user.email);

  // const email = JSON.parse(searchParams!?.email)
  // console.log(email);
  
  // const email = "John@gamil.com"
  let data:any = await getTransactionData(session.user.email);
  // console.log(data[0].createdAt.slice(0,10));
  // console.log("main dashboard........",data);

  return (
    <div style={{ width: "100%"}}>
      <TableHeader />
      <CollapsibleTable data={data} />
    </div>
  );
};

export default MainDashboard;
