import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => ({
    phase: "ready",
    playerIdentity: null,
    playerInRoom: [],

    start: () => {
      set((state) => {
        if (state.phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      });
    },

    insertPlayer: (player) => {
      set((state) => {
        if (player) {
          const updatedPlayers = [...state.playerInRoom, player];
          return { playerInRoom: updatedPlayers };
        }
        return {};
      });
    },
    getPlayerFromServer: (webSocket, player) => {
      if (webSocket && webSocket.connected) {
        console.log(player);
        let dataConverted = null
        if(player){
          dataConverted = JSON.stringify(player)
        }
        
        webSocket.emit("getPlayer", dataConverted , (players) => {
          set((state) => {
            const updatedPlayers = [...state.playerInRoom, ...players];
            return { playerInRoom: updatedPlayers };
          });
        });
      }
    }
  }))
);
