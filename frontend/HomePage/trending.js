// script.js
document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/trending') // Assume you have an API endpoint for trending topics
      .then(response => response.json())
      .then(data => {
        const trendingSection = document.getElementById('trending-topics');
        data.forEach(topic => {
          const topicElement = document.createElement('div');
          topicElement.classList.add('topic');
          topicElement.innerHTML = `
            <h2>${topic.name}</h2>
            <p>${topic.description}</p>
          `;
          trendingSection.appendChild(topicElement);
        });
      })
      .catch(error => {
        console.error('Error fetching trending topics:', error);
      });
  });
  