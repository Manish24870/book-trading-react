import { createContext } from "react";
import io from "socket.io-client";

export const socket = io("ws://localhost:8900", { transports: ["websocket"] });
export const SocketContext = createContext();
