import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const users = new Map(); // socketId => userData
  const io = new Server(httpServer, {

  });

  io.on("connection", (socket) => {
    console.log('Client connected');
    io.emit("users:list", Array.from(users.values()));
    socket.on('message', (data) => {
      console.log('Message received:', data);
      console.log(`[${data.username}]: ${data.text}`);
      // Optionally, emit a response
      io.emit('message', data);
    });

    // Store user info (you can modify this as needed)
    socket.on("user:join", (user) => {
      users.set(socket.id, user); // e.g., { username: "John" }
      console.log("🧍‍♂️ Users:", Array.from(users.values()));
      console.log("🧍‍♂️ Users: Join LIST");
      io.emit("users:list", Array.from(users.values()));
    });

    // Let client request user list
    socket.on("get:users", () => {
      console.log("🧍‍♂️ Users: getUsers Broadcast LIST");
      io.emit("users:list", Array.from(users.values()));
    });

    socket.on("disconnect", (user) => {
      users.delete(socket.id, user); // e.g., { username: "John" }
      console.log("🧍‍♂️ Users:", Array.from(users.values()));
      console.log("🧍‍♂️ Users: disconnect Broadcast LIST");
      io.emit("users:list", Array.from(users.values()))
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});