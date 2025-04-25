import React from 'react';
import { socket } from '../socket';

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className='flex gap-2 w-full max-w-xl'>
      <button className=' w-full bg-slate-400 dark:bg-slate-700 rounded-3xl p-10' onClick={connect}>Connect</button>
      <button className=' w-full bg-slate-400 dark:bg-slate-700 rounded-3xl p-10' onClick={disconnect}>Disconnect</button>
    </div>
  );
}