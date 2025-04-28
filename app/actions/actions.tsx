'use server'
import { cookies } from 'next/headers'
//import { headers } from "next/headers";
import { revalidatePath } from 'next/cache'
import { jwtDecode } from "jwt-decode";
import { Note } from '../inventory/columns';
import { NextRequest, NextResponse } from 'next/server';
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

export const getPost = async (slug: string): Promise<Note | undefined> => {
  try {
    console.log('getPost')
    const tokenResponse = await getToken()
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

export const getAllPosts = async () => {

  try {
    const data = await getToken()
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


export const deletePost = async (slug: string): Promise<void | undefined> => {
  try {
    console.log('deletePost')
    const tokenResponse = await getToken()
    if (tokenResponse) {
      await fetch(`http://localhost:8080/api/posts/deletePost?id=${slug}`, {
        method: 'POST',
        cache: "no-store",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResponse.token}`
        },
      })

      revalidatePath("/inventory", 'page')
    }
  }
  catch (error) {
    console.log(error)
  }
}

export const getToken = async (): Promise<TokenResponse | null> => {

  console.log('getToken')

  const token = (await cookies()).get('token')?.value
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
    return data
  } catch (error) {
    console.error('Error fetching token:', error)
    return null
  }
}


export const writeToken = async (req: NextRequest): Promise<NextResponse> => {
  const data = await getToken()
  const response = NextResponse.next();
  if (data) {
    console.log('writeToken')
    response.cookies.set({
      name: 'token',
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })
  }
  else {
    console.log('cant write cookie couldnt getTOken()')
  }
  return response;
}