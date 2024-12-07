// dashboard.js - Dashboard component displaying gameplay insights.

function renderInsights(insightsData) {
    const dashboardContainer = document.getElementById('dashboard');
    insightsData.forEach(insight => {
        const insightElement = document.createElement('div');
        insightElement.className = 'insight';
        insightElement.innerHTML = `<h2>${insight.title}</h2><p>${insight.description}</p>`;
        dashboardContainer.appendChild(insightElement);
    });
}