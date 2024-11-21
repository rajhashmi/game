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
    isOpponentReady: false,
    isPlayerDisqualify: false,
    showPlayer : () => {
      return get().playerInRoom;
    },
    playerDisqualify: (socket, playerColor) => {
      
      if(socket && socket.connected){
        
        // if(get().playerInRoom.has(playerColor)){

        // }

        socket.emit('removePlayer', playerColor, (response)=>{
          console.log("removed player from server");
          set((state) => {
           state.isPlayerDisqualify = true
           if(state.playerInRoom.has(playerColor)){
            console.log("deleting");
            
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
          const playersStore = get().playerInRoom;
          response.forEach((el)=>{
           
           if(playersStore.has(el[0])){
            playersStore.set(el[0], el[1])
           }else{
            playersStore.set(el[0], el[1])
           }
        });
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
              state.isOpponentReady = true;          
            })
            return {};
          });
        });
      }
    }
  }))
);
