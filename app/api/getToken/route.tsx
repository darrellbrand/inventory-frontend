import { NextApiRequest, NextApiResponse } from 'next';
import { setToken, TokenResponse, getToken } from '../../home/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request : NextRequest) {
    
    console.log('getToken')
    console.log(request.cookies.getAll())
    const token = await getToken()
    if (token) {

        const data: TokenResponse = {
            token: token.token,
            message: 'token cookie fetch successfully!'
        }; 
        return NextResponse.json(data, { status: 200 });
    }
    else {
        const data = { mesage: 'token cookie fetch failed' }
        return NextResponse.json(data, { status: 500 });
    };

}