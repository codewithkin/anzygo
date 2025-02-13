// socket.ts
import { urls } from "@/lib/urls";
import { io, Socket } from "socket.io-client";

const socket: Socket = io(urls.backend);

export default socket;
