import { 
  getAllPlayers,
  createPlayer, 
  playerRoll, 
  getAllPlayerRolls, 
  updatePlayerName, 
  deletePlayerRolls, 
  getWinPercentage, 
  getAverageWinPercentage, 
  getRanking, 
  getLosingPlayer, 
  getWinningPlayer 
} from '../../../src/mySQL/application/controllerSequelize';
import { PlayerDb, Roll } from '../../../src/mySQL/domain/playerSequelize';
import { Player } from '../../../src/mySQL/domain/player';
import * as Utils from '../../../src/mySQL/application/controllerSequelize';

describe('getAllPlayers', () => {
  it('should return all players', async () => {
    const mockReq: any = {};
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayers: any = [
      { id: 1, name: 'Player 1', winPercentage: 50 },
      { id: 2, name: 'Player 2', winPercentage: 75 },
      { id: 3, name: 'Player 3', winPercentage: 60 },
    ];
    jest.spyOn(PlayerDb, 'findAll').mockResolvedValue(mockPlayers);

    // Call the getAllPlayers function with the mock request and response objects
    await getAllPlayers(mockReq, mockRes);

    // Expect the response status to be 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Expect the response to send the mock players array
    expect(mockRes.send).toHaveBeenCalledWith(mockPlayers);

    // Verify that the findAll function was called on PlayerDb
    expect(PlayerDb.findAll).toHaveBeenCalled();
  });
});

describe('createPlayer', () => {
  it('should create a new player', async () => {
    const mockReq: any = {
      params: {
        name: 'Player 1',
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    jest.spyOn(PlayerDb, 'findOne').mockResolvedValue(null);

    jest.spyOn(PlayerDb, 'create').mockResolvedValue(new Player('Player 1'));
    
    // Call the createPlayer function with the mock request and response objects
    await createPlayer(mockReq, mockRes);

    // Expect the response status to be 201
    expect(mockRes.status).toHaveBeenCalledWith(201);

    // Expect the response to send the newly created player
    expect(mockRes.send).toHaveBeenCalledWith(expect.any(Player));

    // Verify that the create function was called on PlayerDb
    expect(PlayerDb.create).toHaveBeenCalled();
  });

  it('should return 409 if player name already exists', async () => {
    const mockReq: any = {
      params: {
        name: 'Existing Player',
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayer: any = new Player('Existing Player');

    // Mock the findOne function of PlayerDb to simulate an existing player with the same name
    jest.spyOn(PlayerDb, 'findOne').mockResolvedValue(mockPlayer);

    // Call the createPlayer function with the mock request and response objects
    await createPlayer(mockReq, mockRes);

    // Expect the response status to be 409
    expect(mockRes.status).toHaveBeenCalledWith(409);

    // Expect the response to send the error message
    expect(mockRes.send).toHaveBeenCalledWith('Player name already exists!');
  });

  it('should create a new player with default name if name is undefined', async () => {
    const mockReq: any = {
      params: {},
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the findOne function of PlayerDb to simulate no existing player with the default name
    jest.spyOn(PlayerDb, 'findOne').mockResolvedValue(null);

    // Call the createPlayer function with the mock request and response objects
    await createPlayer(mockReq, mockRes);

    // Expect the response status to be 201
    expect(mockRes.status).toHaveBeenCalledWith(201);

    // Expect the response to send the newly created player
    expect(mockRes.send).toHaveBeenCalledWith(expect.any(Player));

    // Verify that the create function was called on PlayerDb
    expect(PlayerDb.create).toHaveBeenCalled();
  });
});

describe('playerRoll', () => {
  it('should roll for an existing player and return the roll', async () => {
    const mockReq: any = {
      params: {
        id: 1,
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayer: any = { id: 1, name: 'Player 1' };
    const mockRoll: any = { "playerId": 1 };

    // Mock the findByPk function of PlayerDb to simulate finding an existing player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(mockPlayer);

    // Mock the create function of Roll to simulate the creation of a new roll
    jest.spyOn(Roll, 'create').mockResolvedValue(mockRoll);

    // Call the playerRoll function with the mock request and response objects
    await playerRoll(mockReq, mockRes);

    // Expect the response status to be 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Expect the response to send the roll
    expect(mockRes.send).toHaveBeenCalledWith(expect.any(Object));

    // Verify that the findByPk function was called on PlayerDb
    expect(PlayerDb.findByPk).toHaveBeenCalledWith(1);

    // Verify that the create function was called on Roll
    expect(Roll.create).toHaveBeenCalledWith(expect.any(Object));
  });

  it('should return 404 if player is not found', async () => {
    const mockReq: any = {
      params: {
        id: 2,
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the findByPk function of PlayerDb to simulate not finding the player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(null);

    // Call the playerRoll function with the mock request and response objects
    await playerRoll(mockReq, mockRes);

    // Expect the response status to be 404
    expect(mockRes.status).toHaveBeenCalledWith(404);

    // Expect the response to send the error message
    expect(mockRes.send).toHaveBeenCalledWith('Player not found!');
  });
});

describe('getAllPlayerRolls', () => {
  it('should get all rolls for an existing player', async () => {
    const mockReq: any = {
      params: {
        id: 1,
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayer: any = { id: 1, name: 'Player 1' };
    const mockRolls: any = [
      { id: 1, playerId: 1, result: 'Win' },
      { id: 2, playerId: 1, result: 'Loss' },
    ];

    // Mock the findByPk function of PlayerDb to simulate finding an existing player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(mockPlayer);

    // Mock the findAll function of Roll to simulate retrieving rolls for the player
    jest.spyOn(Roll, 'findAll').mockResolvedValue(mockRolls);

    // Call the getAllPlayerRolls function with the mock request and response objects
    await getAllPlayerRolls(mockReq, mockRes);

    // Expect the response status to be 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Expect the response to send the rolls
    expect(mockRes.send).toHaveBeenCalledWith(mockRolls);

    // Verify that the findByPk function was called on PlayerDb
    expect(PlayerDb.findByPk).toHaveBeenCalledWith(1);

    // Verify that the findAll function was called on Roll with the correct filter
    expect(Roll.findAll).toHaveBeenCalledWith({ where: { playerId: 1 } });
  });

  it('should return 404 if player is not found', async () => {
    const mockReq: any = {
      params: {
        id: 2,
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the findByPk function of PlayerDb to simulate not finding the player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(null);

    // Call the getAllPlayerRolls function with the mock request and response objects
    await getAllPlayerRolls(mockReq, mockRes);

    // Expect the response status to be 404
    expect(mockRes.status).toHaveBeenCalledWith(404);

    // Expect the response to send the error message
    expect(mockRes.send).toHaveBeenCalledWith('Player not found!');
  });
});

describe('updatePlayerName', () => {
  it('should update the name of an existing player', async () => {
    const mockReq: any = {
      params: {
        id: 1,
        updateName: 'Updated Player',
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayer: any = { id: 1, name: 'Player 1' };

    // Mock the findByPk function of PlayerDb to simulate finding an existing player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(mockPlayer);

    // Mock the findOne function of PlayerDb to simulate no existing player with the new name
    jest.spyOn(PlayerDb, 'findOne').mockResolvedValue(null);

    // Mock the update function of PlayerDb to simulate the player name update
    jest.spyOn(PlayerDb, 'update').mockResolvedValue([1]); // Return the number of updated rows

    // Call the updatePlayerName function with the mock request and response objects
    await updatePlayerName(mockReq, mockRes);

    // Expect the response status to be 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Expect the response to send the updated player
    expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({ name: 'Player 1' }));

    // Verify that the findByPk function was called on PlayerDb
    expect(PlayerDb.findByPk).toHaveBeenCalledWith(1);

    // Verify that the findOne function was called on PlayerDb with the new name
    expect(PlayerDb.findOne).toHaveBeenCalledWith({ where: { name: 'Updated Player' } });

    // Verify that the update function was called on PlayerDb with the correct parameters
    expect(PlayerDb.update).toHaveBeenCalledWith(
      { name: 'Updated Player' },
      { where: { id: 1 } }
    );
  });

  it('should return 404 if player is not found', async () => {
    const mockReq: any = {
      params: {
        id: 2,
        updateName: 'Updated Player',
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the findByPk function of PlayerDb to simulate not finding the player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(null);

    // Call the updatePlayerName function with the mock request and response objects
    await updatePlayerName(mockReq, mockRes);

    // Expect the response status to be 404
    expect(mockRes.status).toHaveBeenCalledWith(404);

    // Expect the response to send the error message
    expect(mockRes.send).toHaveBeenCalledWith('Player not found!');
  });

  it('should return 409 if the updated name already exists', async () => {
    const mockReq: any = {
      params: {
        id: 1,
        updateName: 'Existing Player',
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayer: any = { id: 1, name: 'Player 1' };
    const mockUpdatedPlayer: any = { id: 1, name: 'Existing Player' };

    // Mock the findByPk function of PlayerDb to simulate finding an existing player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(mockPlayer);

    // Mock the findOne function of PlayerDb to simulate an existing player with the updated name
    jest.spyOn(PlayerDb, 'findOne').mockResolvedValue(mockUpdatedPlayer);

    // Call the updatePlayerName function with the mock request and response objects
    await updatePlayerName(mockReq, mockRes);

    // Expect the response status to be 409
    expect(mockRes.status).toHaveBeenCalledWith(409);

    // Expect the response to send the error message
    expect(mockRes.send).toHaveBeenCalledWith('Player name already exists!');
  });
});

describe('deletePlayerRolls', () => {
  it('should delete all rolls for an existing player', async () => {
    const mockReq: any = {
      params: {
        id: 1,
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockPlayer: any = { id: 1, name: 'Player 1' };

    // Mock the findByPk function of PlayerDb to simulate finding an existing player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(mockPlayer);

    // Mock the destroy function of Roll to simulate the deletion of rolls
    jest.spyOn(Roll, 'destroy').mockResolvedValue(2); // Return the number of deleted rows

    // Mock the update function of PlayerDb to simulate updating the winPercentage
    jest.spyOn(PlayerDb, 'update').mockResolvedValue([1]); // Return the number of updated rows

    // Call the deletePlayerRolls function with the mock request and response objects
    await deletePlayerRolls(mockReq, mockRes);

    // Expect the response status to be 200
    expect(mockRes.status).toHaveBeenCalledWith(200);

    // Expect the response to send the success message
    expect(mockRes.send).toHaveBeenCalledWith('Player rolls deleted!');

    // Verify that the findByPk function was called on PlayerDb
    expect(PlayerDb.findByPk).toHaveBeenCalledWith(1);

    // Verify that the destroy function was called on Roll with the correct filter
    expect(Roll.destroy).toHaveBeenCalledWith({ where: { playerId: 1 } });

    // Verify that the update function was called on PlayerDb with the correct parameters
    expect(PlayerDb.update).toHaveBeenCalledWith({ winPercentage: 0 }, { where: { id: 1 } });
  });

  it('should return 404 if player is not found', async () => {
    const mockReq: any = {
      params: {
        id: 2,
      },
    };
    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Mock the findByPk function of PlayerDb to simulate not finding the player
    jest.spyOn(PlayerDb, 'findByPk').mockResolvedValue(null);

    // Call the deletePlayerRolls function with the mock request and response objects
    await deletePlayerRolls(mockReq, mockRes);

    // Expect the response status to be 404
    expect(mockRes.status).toHaveBeenCalledWith(404);

    // Expect the response to send the error message
    expect(mockRes.send).toHaveBeenCalledWith('Player not found!');
  });
});

// describe('getWinPercentage', () => {
//   it('should update the win percentage for an existing player', async () => {
//     const mockReq: any = {
//       params: {
//         id: 1,
//       },
//     };

//     const mockRolls: any = [
//       { id: 1, playerId: 1, result: 'You win!' },
//       { id: 2, playerId: 1, result: 'You lose!' },
//       { id: 3, playerId: 1, result: 'You win!' },
//     ];

//     // Mock the findAll function of Roll to simulate retrieving rolls for the player
//     jest.spyOn(Roll, 'findAll').mockResolvedValue(mockRolls);

//     // Mock the update function of PlayerDb to simulate updating the winPercentage
//     jest.spyOn(PlayerDb, 'update').mockResolvedValue([1]); // Return the number of updated rows

//     // Call the getWinPercentage function with the mock request
//     await getWinPercentage(mockReq, {} as any);

//     // Verify that the findAll function was called on Roll with the correct filter
//     expect(Roll.findAll).toHaveBeenCalledWith({ where: { playerId: 1 } });

//     // Verify that the update function was called on PlayerDb with the correct parameters
//     const expectedWinPercentage = ((2 / 3) * 100).toFixed(2); // 2 wins out of 3 rolls
//     expect(PlayerDb.update).toHaveBeenCalledWith(
//       { winPercentage: expectedWinPercentage },
//       { where: { playerId: 1 } }
//     );
//   });
// });

describe('getAverageWinPercentage', () => {
  it('should calculate the average win percentage correctly', async () => {
    const mockPlayers: any = [
      { id: 1, name: 'Player 1', winPercentage: 60 },
      { id: 2, name: 'Player 2', winPercentage: 80 },
      { id: 3, name: 'Player 3', winPercentage: 40 },
    ];

    // Mock the findAll function of PlayerDb to simulate retrieving player data
    jest.spyOn(PlayerDb, 'findAll').mockResolvedValue(mockPlayers);

    // Call the getAverageWinPercentage function
    const averageWinPercentage = await getAverageWinPercentage();

    // Calculate the expected average win percentage
    const expectedAverageWinPercentage = (
      (60 /* Player 1 */ + 80 /* Player 2 */ + 40 /* Player 3 */) / 3 // Number of players
    ).toFixed(2);

    // Verify the expected average win percentage
    expect(averageWinPercentage).toEqual(Number(expectedAverageWinPercentage));
  });

  it('should return 0 if there are no players', async () => {
    // Mock an empty array to simulate no players
    jest.spyOn(PlayerDb, 'findAll').mockResolvedValue([]);

    // Call the getAverageWinPercentage function
    const averageWinPercentage = await getAverageWinPercentage();

    // Verify the expected average win percentage expect TypeError
    expect(averageWinPercentage).toEqual(0);
  });
});

describe('getRanking', () => {
  it('should return players sorted by win percentage and average win percentage', async () => {
    const mockPlayers: any = [
      { id: 1, name: 'Player 1', winPercentage: 60 },
      { id: 2, name: 'Player 2', winPercentage: 80 },
      { id: 3, name: 'Player 3', winPercentage: 40 },
    ];

    // Mock the findAll function of PlayerDb to simulate retrieving player data
    jest.spyOn(PlayerDb, 'findAll').mockReturnValue(
      Promise.resolve([...mockPlayers].sort((a, b) => b.winPercentage - a.winPercentage))
    );

    // Mock the getAverageWinPercentage function using jest.fn()
    const getAverageWinPercentageMock = jest.fn().mockResolvedValue(60);
    jest.spyOn(Utils, 'getAverageWinPercentage').mockImplementation(getAverageWinPercentageMock);

    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the getRanking function with the mock request and response objects
    await getRanking({} as any, mockRes);

    // Verify the expected response status and data sent to the client
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({
      players: [
        { id: 2, name: 'Player 2', winPercentage: 80 },
        { id: 1, name: 'Player 1', winPercentage: 60 },
        { id: 3, name: 'Player 3', winPercentage: 40 },
      ],
      averageWinPercentage: 60, // The mocked value from getAverageWinPercentage
    });

    // Verify that getAverageWinPercentage was called
    expect(getAverageWinPercentageMock).toHaveBeenCalled();
  });
});

describe('getLosingPlayer', () => {
  it('should return the player with the lowest win percentage', async () => {
    const mockPlayers: any = [
      { id: 1, name: 'Player 1', winPercentage: 60 },
      { id: 2, name: 'Player 2', winPercentage: 40 },
      { id: 3, name: 'Player 3', winPercentage: 80 },
    ];

    // Mock the findAll function of PlayerDb to simulate retrieving player data
    jest.spyOn(PlayerDb, 'findAll').mockReturnValue(
      Promise.resolve([...mockPlayers].sort((a, b) => a.winPercentage - b.winPercentage))
    );

    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the getLosingPlayer function with the mock request and response objects
    await getLosingPlayer({} as any, mockRes);

    // Verify the expected response status and data sent to the client
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockPlayers[1]); // The player with the lowest win percentage
  });
});

describe('getWinningPlayer', () => {
  it('should return the player with the highest win percentage', async () => {
    const mockPlayers: any = [
      { id: 1, name: 'Player 1', winPercentage: 60 },
      { id: 2, name: 'Player 2', winPercentage: 80 },
      { id: 3, name: 'Player 3', winPercentage: 40 },
    ];

    // Mock the findAll function of PlayerDb to simulate retrieving player data
    jest.spyOn(PlayerDb, 'findAll').mockReturnValue(
      Promise.resolve([...mockPlayers].sort((a, b) => b.winPercentage - a.winPercentage))
    );

    const mockRes: any = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Call the getWinningPlayer function with the mock request and response objects
    await getWinningPlayer({} as any, mockRes);

    // Verify the expected response status and data sent to the client
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockPlayers[1]); // The player with the highest win percentage
  });
});




