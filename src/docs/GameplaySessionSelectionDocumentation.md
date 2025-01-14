# Gameplay Sessions List Component

## Overview
The `GameplaySessionsList` component is responsible for fetching and displaying recorded gameplay sessions from the backend API. Users can share sessions through generated links.

## Usage
Import the component to use it within your application:
```jsx
import GameplaySessionsList from './components/GameplaySessionsList';
```

## Functionality
- **Fetching Sessions**: The component fetches the list of sessions from the `/api/gameplay-sessions` endpoint.
- **Error Handling**: Displays an error message if the fetch fails.
- **Loading State**: Shows a loading message while data is being fetched.
- **Sharing Sessions**: Users can share sessions through a generated link that can be posted on social media.

## Props
- No props are currently required for this component.

## Example
```jsx
<GameplaySessionsList />
```