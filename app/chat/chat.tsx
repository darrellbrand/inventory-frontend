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
    <div className=" flex w-full flex-col items-center mt-40">
      <ConnectionState isConnected={isConnected} />
      <Events events={messageEvents} />
      <ConnectionManager />
      <MyForm />
    </div>
  );
}