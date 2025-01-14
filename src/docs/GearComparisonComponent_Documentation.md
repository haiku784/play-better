# GearComparisonComponent Documentation

## Overview
The `GearComparisonComponent` displays comparative metrics for selected gear options, including features, pricing, and user reviews.

## Usage
```tsx
import GearComparisonComponent from './components/GearComparisonComponent';

const App = () => {
    return <GearComparisonComponent gearIds={['gear1', 'gear2']} />;
};
```

## Dependencies
- React
- TypeScript
- Axios

## Setup
Ensure that the backend API is available at the defined endpoint to fetch comparative metrics.

## Props
- `gearIds`: An array of gear option IDs to display comparisons for.

## License
This component is licensed under MIT License.