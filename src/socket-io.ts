import { Server as SocketIOServer } from "socket.io";

import config from "../config";

import type { SocketEventEnum } from "./types";
import type { Server as httpServer } from "node:http";

class SocketIO {
  private socket!: SocketIOServer;

  setup(server: httpServer) {
    this.socket = new SocketIOServer(server, {
      cors: { origin: config.environment === "PRODUCTION" ? config.cors : "*" },
    });
    this.socket.on("connection", socket => socket.on("join", async (room: string) => socket.join(room)));
  }

  emit(event: SocketEventEnum, data: any, rooms: string[] = []) {
    if (rooms.length === 0) return this.socket.emit(event, data);
    for (const room of rooms) this.socket.sockets.to(room).emit(event, data);
  }

  on(event: SocketEventEnum, callBack: (...arguments_: any[]) => void) {
    return this.socket.on(event, callBack);
  }

  off(event: SocketEventEnum, callBack: (...arguments_: any[]) => void) {
    this.socket.off(event, callBack);
  }
}

export default new SocketIO();
