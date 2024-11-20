import { useEffect, useState } from "react";
import GameState from "../../Store/Game";

function Oppnent() {
    const gamePlayer = GameState((state) => state.playerIdentity);
    const playerInRoom = GameState((state) => state.playerInRoom);
    const [loadEnemies, setLoadEnemies] = useState(false);
    const [enemies, setEnemies] = useState([]);

    useEffect(() => {

        if (gamePlayer) {
            const delay = 500; 
            setTimeout(() => {
                if (playerInRoom && playerInRoom.size > 1) {
                    setLoadEnemies(true);
                    const playersArray = Array.from(playerInRoom.entries());
                    console.log(playersArray);
                    setEnemies(playersArray);
                }
            }, delay);
        }
    }, [gamePlayer]);

    return (
        <>
            {loadEnemies }
        </>
    );
}

export default Oppnent;
