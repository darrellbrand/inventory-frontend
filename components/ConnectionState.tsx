import React from 'react';
type Props = {
  isConnected : boolean;
};
export function ConnectionState( {isConnected}  : Props) {
  return <p className=' text-center bg-slate-300 dark:bg-slate-900 rounded-3xl  w-full max-w-xl  p-1 text-l'>State: {isConnected ? 'Connected' : 'Disconnected'}</p>;
}