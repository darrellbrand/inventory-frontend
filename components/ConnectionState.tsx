import React from 'react';
type Props = {
  isConnected : boolean;
};
export function ConnectionState( {isConnected}  : Props) {
  return <p className=' text-center bg-slate-300 dark:bg-slate-900 rounded-3xl  w-full max-w-xl m-4 p-4 text-4xl'>State: {isConnected ? 'Connected' : 'Disconnected'}</p>;
}