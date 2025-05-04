'use client'
import { io } from 'socket.io-client';


export const socket = io({
    path: "/socket.io",
    addTrailingSlash: false,
    debug: true
});