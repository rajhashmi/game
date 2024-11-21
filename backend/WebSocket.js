const { Server } = require('socket.io');

let players = new Map();

function setupWebSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
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

        console.log(players);
        socket.on('removePlayer', (data, callback)=>{
            
            if(players.has(data)){
                players.delete(data);
            }
            
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

        

        socket.on('disconnect', () => {
            players.delete(socket.id);  
        });
    });

    return io;
}

module.exports = setupWebSocket;
