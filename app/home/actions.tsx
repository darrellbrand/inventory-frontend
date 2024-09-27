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
   // console.log(data.token)
    cookies().set({
      name: "token",
      value: data.token,
      httpOnly: true,
      secure: true,
      path: '/',
      domain: 'localhost',
      sameSite: 'none',
      maxAge: 60 * 60 * 24,
    })
  }
}

export async function getToken(): Promise<TokenResponse | void> {

    console.log("getTokenAction")
    const token = cookies().get('token')
    if(token && token.value){
      console.log("success got token from cookie")
      return { token : token.value, message : ""} 
    }
    else{
      console.log("fail get token from cookie,  request from server")
      return fetchToken()
    }
}
const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);

 export  async function fetchToken(): Promise<TokenResponse | void> {
    console.log('fetch token')

    try {
      const response = await fetch('http://localhost:8080/token', {
        cache: "no-store",
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          // Your request body
        })
      });
      if (!response.ok) {
        console.error('response status', response.status)
      }
      const data: TokenResponse = await response.json(); // Ensure to call json()
      //  console.log("CHECK DATa")
      //  console.log(data)
      setToken(data)
      return data; // Return the parsed response data
    } catch (error) {
      console.error('Error:', error);
    }

  }
  