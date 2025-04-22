'use server'
import { cookies } from 'next/headers';
//import { headers } from "next/headers";
import { revalidatePath } from 'next/cache'
import { jwtDecode } from "jwt-decode";

export interface TokenResponse {
  token: string
  refreshToken: string
  message: string
}

function isExpired(token: string): boolean {
  const decoded: { exp: number } = jwtDecode(token);
  const isExpired = decoded.exp < Date.now() / 1000;
  console.log(`isExpired = ${isExpired}` )
  return isExpired;
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
    const token = cookies().get('token')?.value
    if(token && !isExpired(token)){
      console.log("success got token from cookie")
      return { token : token, refreshToken: "", message : ""} 
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
  
  export const deletePost = async (data: string): Promise<void | undefined> => {
    try {
      console.log('deletePost')
      const tokenResponse = await getToken()
      if (tokenResponse) {
        const response = await fetch(`http://localhost:8080/api/posts/deletePost?id=${data}`, {
          method: 'POST',
          cache: "no-store",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenResponse.token}`
          },
        })
        console.log(data)
       revalidatePath("/inventory",'page')
      }
    }
    catch (error) {
      console.log(error)
    }
  }