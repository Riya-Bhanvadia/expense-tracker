import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req:NextRequest) {
    const path = req.nextUrl.pathname
    const token = await getToken({
        req:req,
        secret:process.env.NEXTAUTH_SECRET
    })
    const publicPath = path === "/" || path === "signup"

    if(publicPath && token){
        return NextResponse.redirect(new URL("/mainDashboard", req.nextUrl))
    }
    if(!publicPath && !token){
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }
    // if(publicPath && !token){
    //     return NextResponse.redirect(new URL("/signup", req.nextUrl))
    // }
}

export const config = {
    matcher:["/","/mainDashboard"]
}


