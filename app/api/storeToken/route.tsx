import { NextApiRequest, NextApiResponse } from 'next';
import { setToken, TokenResponse } from '../../home/actions';
import { NextRequest, NextResponse } from 'next/server';
import { error } from 'console';
import { cookies } from 'next/headers';
const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);
export async function GET(request: NextRequest) {
  
}


