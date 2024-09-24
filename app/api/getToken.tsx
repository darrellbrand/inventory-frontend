import { TokenResponse } from "../home/actions";
export async function getToken(): Promise<TokenResponse | null> {
    try {
        // Fetch the token from the API
        const tokenResponse = await fetch('http://localhost:3000/api/getToken', {
            credentials: 'include',  // Include cookies in the request
            cache: 'no-store',       // Disable cache
            method: 'GET',           // HTTP GET method
        });

        // Check if the response is successful
        if (!tokenResponse.ok) {
            console.error('Failed to fetch token:', tokenResponse.statusText);
            return null;
        }

        // Parse the response as JSON
        const data = await tokenResponse.json() as TokenResponse;
        console.log('Token received:', data.token);

        return data;  // Return the token data
    } catch (error) {
        // Handle any network or processing errors
        console.error('Error fetching token:', error);
        return null;
    }
}