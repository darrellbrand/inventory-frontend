'use client'
import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';
import { ConnectionState } from '../../components/ConnectionState';
import { ConnectionManager } from '../../components/ConnectionManager';
import { Events } from "../../components/Events";
import { MyForm } from '../../components/MyForm';

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [messageEvents, setMessageEvents] = useState<string[]>([]);

  useEffect(() => {

    function onConnect() {
      console.log(`client connect()`)
      setIsConnected(socket.connected);
    }

    function onDisconnect() {
      console.log(`client disconnect()`)
      setIsConnected(false);
    }

    function onMessageEvent(value: string) {
      console.log(`onMesageEvent` + value)
      setMessageEvents(previous => [...previous, value]);
    }

    socket.connect();

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
      socket.disconnect();

    };
  }, []);

  return (
    <div className=' flex flex-col w-screen items-center justify-center  h-screen bg-background pb-5 '>
      <div className=" flex w-full max-w-xs md:max-w-7xl  h-full flex-col items-center  justify-center gap-1 mt-16">
        <Events events={messageEvents} />
        <MyForm />
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
      </div>
    </div>
  );
}