import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // Make sure the backend is running on this port
let socket;

export const connectSocket = () => {
    if (!socket || !socket.connected) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"], // Ensure WebSocket transport
            reconnection: true, // Auto-reconnect
            // reconnectionAttempts: 5, // Retry 5 times
            // reconnectionDelay: 2000, // Wait 2 seconds before retrying
        });

        socket.on("connect", () => {
            console.log("✅ Connected to WebSocket:", socket.id);
        });

        socket.on("disconnect", (reason) => {
            console.log("❌ Disconnected:", reason);
        });

        socket.on("message", (data) => {
            console.log("📩 Message received:", data);
        });
    }
    return socket;
};

export const getSocket = () => socket;
