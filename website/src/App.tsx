import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { Player } from '../../src/domain/player';
import { IRoll } from '../../src/domain//utilities/IRoll';


function App() {
  const [playerData, setPlayerData] = useState<Player[]>([]);
  const [rollsData, setRollsData] = useState<IRoll[]>([]);
  const [playerId, setPlayerId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [rankingData, setRankingData] = useState([]);
  const [averageWins, setAverageWins] = useState(0);
  const [winner, setWinner] = useState<Player>(undefined!);
  const [loser, setLoser] = useState<Player>(undefined!);

  const createPlayer = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/players/${playerName}`);
      console.log(response.data);
      setPlayerData([...playerData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlayerNameChange = (event: any) => {
    setPlayerName(event.target.value);
  };

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

  const handlePlayerIdChange = (event: any) => {
    setPlayerId(event.target.value);
  };

  const playGame = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/games/${playerId}/`);  
      console.log(response.data);
      setRollsData([...rollsData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const changePlayerName = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/players/${playerId}/${playerName}`);
      console.log(response.data);
      setPlayerData([...playerData, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/games/${playerId}`);
      console.log(response.data);
      setRollsData([]);
    } catch (error) {
      console.error(error);
    }
  };

  const getRanking = async () => {
    const hidden = document.querySelector('.hidden');
    hidden?.classList.remove('hidden');

    try {
      const response = await axios.get(`http://localhost:3000/ranking`);
      console.log(response.data);
      setRankingData(response.data.players);
      setAverageWins(response.data.averageWinPercentage);
    } catch (error) {
      console.error(error);
    }
  };

  const getWinner = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/ranking/winner`);
      console.log(response.data);
      setWinner(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLoser = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/ranking/loser`);
      console.log(response.data);
      setLoser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
      </div>
      <h1>Dice Game</h1>

      <div className="card">
        <input type="text" value={playerName} onChange={handlePlayerNameChange} placeholder="Enter Player Name" />
        <button onClick={createPlayer}>Create New Player</button>
      </div>

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
        <input type="text" value={playerId} onChange={handlePlayerIdChange} placeholder="Enter Player ID" />
        <button onClick={playGame}>Play Game</button>
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
        <input type="text" value={playerId} onChange={handlePlayerIdChange} placeholder="Enter Player ID" />
        <input type="text" value={playerName} onChange={handlePlayerNameChange} placeholder="Enter Player Name" />
        <button onClick={changePlayerName}>Change Player Name</button>
        {playerData.map((player: any) => (
          <div className='' key={player.id}>
            <p>ID: {playerData.find((player: any) => player.id === playerId)?.name}</p>
            <p>Name: {player.name}</p>
            <p>Win Rate: {player.winPercentage}%</p>
            <hr />
          </div>
        ))}
      </div>

      <div className='card'>
        <input type="text" value={playerId} onChange={handlePlayerIdChange} placeholder="Enter Player ID" />
        <button onClick={deleteData}>Delete Data</button>
      </div>

      <div className='card'>
        <button onClick={getRanking}>Get Ranking</button>
        <p className="hidden">Average Win Rate: {averageWins}%</p>
        {rankingData.map((player: any) => (
          <div className='' key={player.id}>
            <p>ID: {player.id}</p>
            <p>Name: {player.name}</p>
            <p>Win Rate: {player.winPercentage}%</p>
            <hr />
          </div>
        ))}
      </div>

      <div className='card'>
        <button onClick={getWinner}>Get Winner</button>
        {winner && (
          <div className='' key={winner.id}>
            <p>ID: {winner.id}</p>
            <p>Name: {winner.name}</p>
            <p>Win Rate: {winner.winPercentage}%</p>
            <hr />
          </div>
        )}
      </div>

      <div className='card'>
        <button onClick={getLoser}>Get Loser</button>
        {loser && (
          <div className='' key={loser.id}>
            <p>ID: {loser.id}</p>
            <p>Name: {loser.name}</p>
            <p>Win Rate: {loser.winPercentage}%</p>
            <hr />
          </div>
        )}
      </div>
    </>
  )
}

export default App
