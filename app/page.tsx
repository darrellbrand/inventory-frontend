
import React from 'react'
import { TokenResponse, setToken } from './actions/actions'
import HomePage from './home'

type Props = {}


const page = async (props: Props) => {
  return (
    <HomePage></HomePage>
  );
};

export default page