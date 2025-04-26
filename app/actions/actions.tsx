'use server'
import { cookies } from 'next/headers'
//import { headers } from "next/headers";
import { revalidatePath } from 'next/cache'
import { jwtDecode } from "jwt-decode";
import { Note } from '../inventory/columns';
export interface TokenResponse {
  token: string
  refreshToken: string
  message: string
}

function isExpired(token: string): boolean {
  const decoded: { exp: number } = jwtDecode(token);
  const isExpired = decoded.exp < Date.now() / 1000;
  console.log(`isExpired = ${isExpired}`)
  return isExpired;
}


const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);

export async function fetchToken(): Promise<TokenResponse | void> {
  'use server'
  console.log('fetch token')
  const token = cookies().get('token')?.value
  if (token && !isExpired(token)) {
    console.log("success got token from cookie")
    return { token: token, refreshToken: "", message: "" }
  }
 

  console.log("fail get token from cookie,  request from server")

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
    const cookieStore = await cookies()
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
   
    return data; // Return the parsed response data
  } catch (error) {
    console.error('Error:', error);
  }
}


export const getPost = async (slug: string, tokenResponse: TokenResponse | void): Promise<Note | undefined> => {
  try {
    console.log('get postss')
    if (tokenResponse) {
      const response = await fetch(`http://localhost:8080/api/posts/getPost?id=${slug}`, {
        method: 'GET',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResponse.token}`
        },
      })
      console.log(slug)
      return await response.json()
    }
  }
  catch (error) {
    console.log(error)
  }
}

export const getAllPosts = async (data: TokenResponse | null) => {
  'use server'
  try {
    if (data) {
      const postResponse = await fetch('http://localhost:8080/api/posts/findAll', {
        cache: "no-store",
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.token}`
        },
        credentials: 'include',
      });
      if (!postResponse.ok) {
        console.error('response status', postResponse.status)
      }
      const ret = await postResponse.json() as Note[]
      console.log(ret)
      return ret
    }
  }
  catch (error) {
    console.error(error)
  }
}


export async function deletePostAction(id: string) {
  console.log('Deleting post:', id)
  try {
    const tokenResponse = await fetchToken()
    if (tokenResponse) {
      const response = await fetch(`http://localhost:8080/api/posts/deletePost?id=${id}`, {
        method: 'POST',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResponse.token}`
        },
      })
      if (!response.ok) {
        console.error('Delete failed:', response.status)
      }
      revalidatePath("/inventory", 'page') // Revalidate after delete
    }
  } catch (error) {
    console.error('Delete error', error)
  }
}


export const deletePost = async (data: string): Promise<void | undefined> => {
  try {
    console.log('deletePost')
    const tokenResponse = data
    if (tokenResponse) {
      const response = await fetch(`http://localhost:8080/api/posts/deletePost?id=${data}`, {
        method: 'POST',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResponse}`
        },
      })
      console.log(data)
      revalidatePath("/inventory", 'page')
    }
  }
  catch (error) {
    console.log(error)
  }
}

export async function getTokenAction(): Promise<TokenResponse | null> {
  'use server'
  console.log('getTokenAction')

  const token = cookies().get('token')?.value
  if (token && !isExpired(token)) {
    console.log('Found valid token in cookies')
    return { token, refreshToken: "", message: "" }
  }

  console.log('No valid token found, requesting new one')

  try {
    const response = await fetch('http://localhost:8080/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}), // Your body if needed
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Failed to fetch token:', response.status)
      return null
    }

    const data = await response.json() as TokenResponse
    const cookieStore = await cookies()
    cookies().set({
      name: 'token',
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })

    console.log('New token set in cookies')

    return data
  } catch (error) {
    console.error('Error fetching token:', error)
    return null
  }
}