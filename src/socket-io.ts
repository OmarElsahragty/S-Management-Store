import { Server as SocketIOServer } from "socket.io";

import config from "../config";

import type { SocketEventEnum } from "./types";
import type { Server as httpServer } from "node:http";

class SocketIO {
  private socket!: SocketIOServer;

  public setup(server: httpServer): void {
    this.socket = new SocketIOServer(server, {
      cors: { origin: config.environment === "PRODUCTION" ? config.cors : "*" },
    });
    this.socket.on("connection", (socket) =>
      socket.on("join", async (room: string) => socket.join(room))
    );
  }

  public emit(event: SocketEventEnum, data: unknown, rooms: string[] = []): boolean {
    if (rooms.length === 0) return this.socket.emit(event, data);
    return rooms.reduce(
      (accumulator, room) => accumulator && this.socket.sockets.to(room).emit(event, data),
      true
    );
  }

  public on(event: SocketEventEnum, callBack: (...arguments_: unknown[]) => void): void {
    this.socket.on(event, callBack);
  }

  public off(event: SocketEventEnum, callBack: (...arguments_: unknown[]) => void): void {
    this.socket.off(event, callBack);
  }
}

export const socketIO = new SocketIO();
