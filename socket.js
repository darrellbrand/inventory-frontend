'use client'
import { io } from 'socket.io-client';


export const socket = io("https://inventory-frontend-62sl.onrender.com", {
    path: "/socket.io",
    transports: ["websocket"], // safe in production
  });
  