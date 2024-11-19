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
                if(!players.has(socket.id)){
                    players.set(socket.id, convertData);
                    console.log(players);
                    
                }
            }
            const playerList = Array.from(players.values()); 
            
            callback(playerList); 
        });

        // socket.on('setPlayer', (playerData, callback) => {
        //     if (!players.has(socket.id)) {
        //         players.set(socket.id, playerData);  
        //         
        //     } else {
        //         
        //     }
        // });

        socket.on('disconnect', () => {
            
            players.delete(socket.id);  
        });
    });

    return io;
}

module.exports = setupWebSocket;
