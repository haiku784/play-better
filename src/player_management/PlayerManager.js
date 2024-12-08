/** 
 * This module manages player-specific functionalities
 * within a given game context.
 */
class PlayerManager {
    constructor() {
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    getPlayers() {
        return this.players;
    }
}

// Example Usage
const playerManager = new PlayerManager();
playerManager.addPlayer({ name: 'JohnDoe', score: 100 });
console.log(playerManager.getPlayers());