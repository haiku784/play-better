const llama = require('llama');

function processGameplayData(gameData) {
    const insights = llama.analyze(gameData);
    return insights;
}