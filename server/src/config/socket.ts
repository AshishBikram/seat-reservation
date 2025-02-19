import { Server } from "socket.io";

function initializeSocket(server : any) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Frontend
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected");
        console.log(socket.id);
        // Listen for messages
        socket.on("book seats", (msg) => {
            console.log("Message received:", msg);
            io.emit("book seats", msg); // Broadcast message to all clients
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
        // Handle messages, etc.
    });
}
export { initializeSocket };