'use client'
import { io } from 'socket.io-client';


export const socket = io("https://inventory-frontend-62sl.onrender.com", {
    withCredentials: true,
    transports: [ "polling"],
  });
  