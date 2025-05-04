import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";
const port = parseInt(process.env.PORT, 10) || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const io = new Server(httpServer, {
    path: "/socket.io",
  });
  const users = new Map(); // socketId => userData
  

  io.on("connection", (socket) => {
    console.log('Client connected');
    io.emit("users:list", Array.from(users.values()));
    socket.on('message', (data, callback) => {
      console.log('Message received:', data);
      console.log(`[${data.username}]: ${data.text}`);
      if (callback) {
        callback(null, 'received'); // first arg is "error", second is "response"
      }
      // Optionally, emit a response
      io.emit('message', data);
    });

    io.engine.on("connection_error", (err) => {
      console.log(err.req);      // the request object
      console.log(err.code);     // the error code, for example 1
      console.log(err.message);  // the error message, for example "Session ID unknown"
      console.log(err.context);  // some additional error context
    });


    socket.on("connect_error", (err) => {
      // the reason of the error, for example "xhr poll error"
      console.log(err.message);

      // some additional description, for example the status code of the initial HTTP response
      console.log(err.description);

      // some additional context, for example the XMLHttpRequest object
      console.log(err.context);
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