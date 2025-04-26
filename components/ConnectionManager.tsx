import React from 'react';
import { socket } from '../socket';
import { Unplug } from 'lucide-react';
import { Cable } from 'lucide-react';
export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  return (
    <div className='flex gap-2 w-full justify-center items-center'>
      <button className=' w-full bg-slate-400 dark:bg-slate-700 rounded-3xl p-3' onClick={connect}><Cable></Cable></button>
      <button className=' w-full bg-slate-400 dark:bg-slate-700 rounded-3xl p-3' onClick={disconnect}><Unplug></Unplug></button>
    </div>
  );
}