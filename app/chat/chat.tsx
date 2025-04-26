'use client'
import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';

import { Events } from "../../components/Events";
import { MyForm } from '../../components/MyForm';
import { useSession } from "next-auth/react"
export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [messageEvents, setMessageEvents] = useState<{
    userName: string
    text: string
  }[]>([]);
  const [userList, setUserList] = useState<{ username: string; }[]>([]);
  const { data: session, status } = useSession()
  console.log("Session: ", session, "Status:", status);
  useEffect(() => {

    if (status !== "authenticated") return;

    function onConnect() {
      console.log(`client connect()`)
      setIsConnected(socket.connected);
    }

    function onDisconnect() {
      console.log(`client disconnect()`)
      setIsConnected(false);
    }

    function onMessageEvent(value: {
      userName: string,
      text: string
    }) {
      console.log(`onMesageEvent`)
      console.log(`${value.userName}: ${value.text}`);
      setMessageEvents(previous => [...previous, value]);
    }
    function onUserList(users: { username: string; }[]) {
      console.log("Current users:", users);
      setUserList(users)
    }
    socket.connect();
    if (session?.user) {
      console.log(session?.user?.name + " userJoin")
      socket.emit('user:join', { username: `${session?.user?.name}` });
    }

    // Ask for all users
    socket.emit('get:users');

    // Listen for response
    socket.on('users:list', onUserList);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('message', onMessageEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('message', onMessageEvent);
      socket.disconnect();

    };
  }, [session, status]);

  return (


    <div className=' flex flex-col w-screen items-center justify-center  h-screen bg-background '>

      <div className=" flex w-full max-w-2xl h-full flex-col items-center  justify-center gap-1  mb-2 mt-16">

        <Events events={messageEvents} isConnected={isConnected} userList={userList} />
        <MyForm></MyForm>

      </div>
    </div>
  );
}