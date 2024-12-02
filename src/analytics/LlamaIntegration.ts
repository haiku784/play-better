// Function to utilize Llama for generating gameplay insights
import { generateInsights } from 'llama';

function getActionableInsights(data) {
    return generateInsights(data);
}