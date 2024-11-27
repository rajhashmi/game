// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// eslint-disable-next-line react-refresh/only-export-components
export default create(
  subscribeWithSelector((set, get) => ({
    phase: "ready",
    playerIdentity: null,
    playerInRoom: new Map(),
    isOpponentReady: false,
    isPlayerDisqualify: false,
    showPlayer : () => {
      return get().playerInRoom;
    },
    reStart : () => {
      return get().isPlayerDisqualify = false;
    },
    playerDisqualify: (socket, playerColor) => {
      
      if(socket && socket.connected){
        socket.emit('removePlayer', playerColor, (response)=>{
          get().isPlayerDisqualify = true
          set((state) => {
            
           if(state.playerInRoom.has(playerColor)){
            state.playerInRoom.delete(playerColor)
           }
            return {};
          });
          
        })
      }
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
    

    sendNewPositionToServer: (webSocket, position) => {
      if (webSocket && position.position.y && webSocket.connected) {
        const dataConverted = JSON.stringify(position);
        webSocket.emit("setPlayerLocation", dataConverted, (response) => {
          set((state) => {
            const updatedMap = new Map(state.playerInRoom); 
    
            updatedMap.forEach((value, key) => {
              if (!response.some(([resKey]) => resKey === key)) {


            
                updatedMap.delete(key);  

              }
            });
    
            response.forEach(([key, value]) => {
              updatedMap.set(key, value);
            });
    
            return { playerInRoom: updatedMap };  
          });
        });
      }
    },
    
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
              state.isOpponentReady = true;          
            })
            return {};
          });
        });
      }
    }
  }))
);
