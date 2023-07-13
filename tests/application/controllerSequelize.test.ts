import { getAllPlayers } from './../../src/application/controllerSequelize';
import request from 'supertest';
import { app, server } from '../../src/infrastructure/app';
import { PlayerDb } from '../../src/domain/playerSequelize';

// tests
describe('Sequelize Controller Tests', () => {
	afterAll(() => {
		server.close();
	});

	describe('Function getAllPlayers', () => {
		test('the getAllPlayers function returns all th e players', async () => {
			const response = await request(app).get('/players');

			const players = await PlayerDb.findAll();

			expect(response.body).toEqual(players);
		});
	});
});
