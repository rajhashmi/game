/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// eslint-disable-next-line react-refresh/only-export-components
export default create(
  subscribeWithSelector((set, get) => ({
    phase: "ready",
    playerIdentity: null,
    playerInRoom: new Map(),


    showPlayer : () => {
      return get().playerInRoom;
    }
    ,
    start: () => {
      set((state) => {
        if (state.phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      });
    },

    setPlayer: (player) => {
      set((state) => {
        state.playerIdentity = player;
        console.log(state.playerIdentity);
        
        return {}
      })
    },
    getPlayer: () => {
      return get().playerIdentity;
    }
,
    insertPlayer: (player) => {
      set((state) => {
        if (player) {
          if (!state.playerInRoom.has(player[0])) {
            state.playerInRoom.set(player[0], player[1]);
          }
        }
        return {};  
      });
    },
    

    sendNewPositionToServer : (webSocket, position) => {
      if(webSocket && position.position.y && webSocket.connected){
        const dataConverted = JSON.stringify(position);
        webSocket.emit("setPlayerLocation", dataConverted, (response)=>{
          // set((state) => {
            // const updatedPlayers = [...state.playerInRoom, [...response]];
            // return { playerInRoom: updatedPlayers };
            // get().playerInRoom.forEach((el)=>{
              // console.log(el);

            //   if(Array.isArray(el)){
            //     const identity = el[0];
            //     const position = el[1]
            //   }
            // })
              
          // });
        })

      }
    }
    ,
    getPlayerFromServer: (webSocket, player) => {
      if (webSocket && webSocket.connected) {
        let dataConverted = null
        if(player){
          dataConverted = JSON.stringify(player)
        }
        
        webSocket.emit("getPlayer", dataConverted , (players) => {
          set((state) => {
            
            players.forEach((el)=>{
              if(!state.playerInRoom.has(el[0])){
                state.playerInRoom.set(el[0], el[1])
              }
              
            })
            return {};
          });
        });
      }
    }
  }))
);
