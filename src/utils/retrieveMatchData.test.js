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