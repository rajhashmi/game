const { Server } = require('socket.io');

let players = new Map();

function setupWebSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: 'https://multiplayer-game-frontend.vercel.app',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        socket.on('getPlayer', ( data, callback) => {
            if(data){
                const convertData = JSON.parse(data);
                if(!players.has(convertData.color)){
                    players.set(convertData.color, convertData.position);
                    
                }
            }
            const playerList = Array.from(players.entries());
            callback(playerList); 
        });
        socket.on('removePlayer', (data, callback)=>{
            if(players.has(data)){
                players.delete(data);
            }
            callback(true);
            
        })
        socket.on('setPlayerLocation', (data, callback)=> {
            if(data){
                const convertData = JSON.parse(data);
                const identity = `#${convertData.color}`;
                if(players.has(identity)){
                    players.set(identity,convertData.position)
                }
                const playersArray = Array.from(players.entries()); 
                callback(playersArray);
            }
        })
        socket.on("userDisconnect", (data) => {
            if (data && data.color) {
                if(players.has(data.color)){
                    players.delete(data.color)
                    
                }
            }
          
            players.delete(socket.id);
          });
          
          socket.on("disconnect", () => {
          });
    });

    return io;
}
module.exports = setupWebSocket;