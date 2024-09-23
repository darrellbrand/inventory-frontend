import React from 'react'

import HomePage from './home'
type Props = {}
const username = 'dj';
const password = 'password';
const authString = btoa(`${username}:${password}`);

const page = async (props: Props) => {

  async function fetchToken() {
    console.log('fetch token')
    try {
      const response = await fetch('http://localhost:8080/token',{
        cache: "no-store",
        method: 'POST',
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Your request body
        })
      });
      if (!response.ok) {
        console.error('response status', response.status)
      }
      const ret = await response.json
      console.log(response)
      console.log(response.status)
      return ret
    } catch (error) {
      console.error('Error:', error);
    }
  }
    await fetchToken()
  return (
    <HomePage></HomePage>
  )
}

export default page