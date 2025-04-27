import React from 'react';
import { socket } from '../socket';
import { Unplug } from 'lucide-react';
import { Cable } from 'lucide-react';
import { boolean } from 'zod';
type Props = {
  isConnected: boolean
}
export function ConnectionManager({ isConnected }: Props) {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }
  function toggleConnection() {
    if(socket.connected)
    {
      disconnect();
    }
    else{
        connect();
    }
   
  }
  return (
    <div className='absolute top-[5rem] right-10  md:top-10 flex gap-2  z-20 justify-center items-center'>
      <button className={`${isConnected
        ? 'bg-green-500  dark:bg-green-500'
        : 'bg-red-500  dark:bg-red-500'}` + ' w-full rounded-3xl p-3'} onClick={() => toggleConnection()}><Unplug></Unplug></button>
    </div>
  );
}