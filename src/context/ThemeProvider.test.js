import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';

test('renders ThemeProvider with accessible theme', () => {
    const theme = { foregroundColor: [255, 255, 255], backgroundColor: [0, 0, 0] };
    const { getByText } = render(
        <ThemeProvider theme={theme}>
            <div>Test Theme</div>
        </ThemeProvider>
    );
    expect(getByText(/Test Theme/i)).toBeInTheDocument();
});