const RecordingService = require('../src/RecordingService');
const { describe, it, expect } = require('jest');

describe('RecordingService', () => {
  let service;

  beforeEach(() => {
    service = new RecordingService();
  });

  it('should start recording', () => {
    service.start();
    expect(service.isRecording).toBe(true);
  });

  it('should stop recording', () => {
    service.start();
    service.stop();
    expect(service.isRecording).toBe(false);
  });

  it('should return recorded data', () => {
    service.start();
    service.record('Test data');
    service.stop();
    expect(service.getRecordedData()).toEqual(['Test data']);
  });

  it('should handle stop without start gracefully', () => {
    expect(() => service.stop()).not.toThrow();
  });

  afterEach(() => {
    service.reset(); // Reset service state after each test
  });
});