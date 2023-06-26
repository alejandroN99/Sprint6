import { Player } from "../domain/player";

const players: Player[] = [];

export const createdPlayer = (name: string) => {
    const player = new Player(name);
    players.push(player);
    return 'Player created successfully!'
};

export const updatePlayerName = (name: string, updateName: string) => {
    const findPlayer = players.find( player => player.name === name);
    if(!findPlayer){
        return 'Player not found!';
    }else{
        findPlayer.name = updateName;
        console.log(players);
        return 'Update player name successfully!';
    }
};

