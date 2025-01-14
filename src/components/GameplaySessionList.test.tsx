import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GameplaySessionList from './GameplaySessionList';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('GameplaySessionList', () => {
  it('fetches and displays gameplay sessions', async () => {
    mock.onGet('/api/recording/sessions').reply(200, [{ id: 1, title: 'Test Session', description: 'A test session', videoUrl: 'http://testurl.com/video.mp4', duration: 120 }]);

    render(<GameplaySessionList />);
    await waitFor(() => expect(screen.getByText('Test Session')).toBeInTheDocument());
  });

  it('displays error message on fetch failure', async () => {
    mock.onGet('/api/recording/sessions').reply(500);

    render(<GameplaySessionList />);
    await waitFor(() => expect(screen.getByText('Failed to fetch sessions.')).toBeInTheDocument());
  });
});