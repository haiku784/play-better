import { retrieveMatchData } from './retrieveMatchData';

describe('retrieveMatchData', () => {
    test('successfully retrieves match data', async () => {
        const mockData = { match_id: '12345', player_stats: [], game_events: [], timestamp: '2025-01-27T09:21:53' }; 
        global.fetch = jest.fn(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData),
        }));

        const data = await retrieveMatchData('12345');
        expect(data).toEqual(mockData);
    });

    test('handles fetch error', async () => {
        global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
        await expect(retrieveMatchData('12345')).rejects.toThrow('Failed to retrieve match data');
    });
});

import retrieveMatchData from './retrieveMatchData';

describe('retrieveMatchData Utility', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    test('successfully retrieves match data', async () => {
        const mockData = { match_id: '123', player_stats: [], game_events: [], timestamp: '2025-01-27T09:21:53Z' };
        fetch.mockResolvedValueOnce({ ok: true, json: jest.fn().mockResolvedValueOnce(mockData) });
        const data = await retrieveMatchData('123');
        expect(data).toEqual(mockData);
    });

    test('throws error on fetch failure', async () => {
        fetch.mockResolvedValueOnce({ ok: false });
        await expect(retrieveMatchData('123')).rejects.toThrow('Failed to retrieve match data');
    });
});