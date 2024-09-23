import { NextApiRequest, NextApiResponse } from 'next';
import { setToken, TokenResponse } from '../../home/actions';
import { NextRequest, NextResponse } from 'next/server';
import { error } from 'console';
import { cookies } from 'next/headers';
const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);
export async function GET(request: NextRequest) {
  console.log('start storetoken')
  async function fetchToken(): Promise<TokenResponse | void> {
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
      return data; // Return the parsed response data
    } catch (error) {
      console.error('Error:', error);
    }

  }
  const token = await fetchToken()
  if (token) {
    await setToken(token)
    const data = {
      message: 'token cookie set successfully!' ,
      token: token.token
    };
    return NextResponse.json(data, { status: 200 });
  }
  else {
    const data = { message: 'token cookie set failed', error: " token null" };
    return NextResponse.json(data, { status: 500 });
  }
}


