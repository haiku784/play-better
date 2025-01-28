import reportDownloadCallback from './reportDownloadCallback';

describe('reportDownloadCallback', () => {
  test('successful download triggers correct behavior', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      blob: jest.fn(() => Promise.resolve(new Blob()))
    }));
    const result = await reportDownloadCallback({ reportUrl: 'http://example.com/report' });
    expect(result).toBe(true);
  });

  test('failed download handles error', async () => {
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));
    const result = await reportDownloadCallback({ reportUrl: 'http://example.com/fail' });
    expect(result).toBe(false);
  });
});