'use server'
import { cookies } from 'next/headers';
//import { headers } from "next/headers";
export interface TokenResponse {
  token: string
  message: string
}

export async function setToken(data: TokenResponse) {

  if (data && data.token) {
    console.log("setTokenAction")
    console.log(data.token)
    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: false,
      path: '/',
      domain: 'localhost',
      sameSite: 'none',
      maxAge: 60 * 60 * 24,
    })
  }
}

export async function getToken(): Promise<TokenResponse | void> {

    console.log("getTokenAction")
    console.log(cookies().getAll())
    const token = cookies().get('token')
    if(token && token.value){
      return { token : token.value, message : ""} 
    }
    else{
      return 
    }
}
