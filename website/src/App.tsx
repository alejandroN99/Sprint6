import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { Player } from '../../src/domain/player';
import { IRoll } from '../../src/domain//utilities/IRoll';


function App() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [rollsData, setRollsData] = useState<IRoll[]>([]);
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');

  const fetchPlayerData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/players/');
      console.log(response.data);
      setPlayerData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlayerRolls = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/games/${playerId}/`);
      console.log(response.data);
      setRollsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPlayer = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/players/${playerName}`);
      console.log(response.data);
      setPlayerData([...playerData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerIdChange = (event: any) => {
    setPlayerId(event.target.value);
  };

  const handlePlayerNameChange = (event: any) => {
    setPlayerName(event.target.value);
  };

  return (
    <>
      <div>
      </div>
      <h1>Sprint 6</h1>
      <div className="card">
        <button onClick={fetchPlayerData}>Get All Players</button>
        {playerData.map((player: any) => (
          <div className='' key={player.id}>
            <p>ID: {player.id}</p>
            <p>Name: {player.name}</p>
            <p>Win Rate: {player.winPercentage}%</p>
            <hr />
          </div>
        ))}
      </div>
      <div className="card">
        <input type="text" value={playerId} onChange={handlePlayerIdChange} placeholder="Enter Player ID" />
        <button onClick={fetchPlayerRolls}>Get Player Rolls</button>
        {rollsData.map((roll: any) => (
          <div className='' key={roll.id}>
            <p>Player: {playerData.find((player: any) => player.id === roll.playerId)?.name}</p>
            <p>Roll 1: {roll.roll1}</p>
            <p>Roll 2: {roll.roll2}</p>
            <p>Total: {roll.total}</p>
            <p>{roll.result}</p>
            <hr />
          </div>
        ))}
      </div>
      <div className="card">
        <input type="text" value={playerName} onChange={handlePlayerNameChange} placeholder="Enter Player Name" />
        <button onClick={createPlayer}>Create New Player</button>
        
      </div>
    </>
  )
}

export default App
