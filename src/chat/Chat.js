import React, { useEffect, useState } from "react";
import { connectSocket, getSocket } from "../socket/socket";

const Chat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = connectSocket();
console.log(socket)
        socket.on("message", (data) => {
            console.log("📩 New message:", data);
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.disconnect(); // Cleanup on unmount
        };
    }, []);

    const sendMessage = () => {
        const socket = getSocket();
        if (socket) {
            socket.emit("message", { text: "Hello from React!" });
        }
    };

    return (
        <div>
            <h2>WebSocket Chat</h2>
            <button onClick={sendMessage}>Send Message</button>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg.text}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;
