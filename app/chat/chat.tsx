'use client'
import React, { useState, useEffect } from 'react';
import { socket } from '../../socket';

import { Events } from "../../components/Events";
import { MyForm } from '../../components/MyForm';
import { useSession } from "next-auth/react"
import { ConnectionManager } from '../../components/ConnectionManager';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-stars';



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

    

    function onConnect() {
      console.log(`client connect()`)
      setIsConnected(socket.connected);
      updateList()
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
    function updateList() {
      if (session?.user) {
        console.log(session?.user?.name + " userJoin")
        socket.emit('user:join', { username: `${session?.user?.name}` });
      }
      socket.emit('get:users');
    }

    socket.connect();
    updateList()

    // Ask for all users


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
    <div className=' relative flex w-screen h-screen overflow-hidden '>
      <ConnectionManager isConnected={isConnected} />
      <GlowingStarsBackgroundCard className='w-screen h-screen fixed top-0'>
      </GlowingStarsBackgroundCard>
      <div className=' flex items-center justify-center  w-full h-full  '>
        <div className=" flex flex-col  w-full max-w-7xl h-full  items-center  justify-center gap-1  ">
          <Events events={messageEvents} userList={userList} />
          <MyForm></MyForm>
        </div>
      </div>

    </div>
  );
}