const apiKey = 'cd8bf500c4974ecd9822657d1d2ad899';
const newsList = document.getElementById('news-list');
import { suggestions } from "./suggestions.Js";
import { companyNames } from "./Names.js";
import { Sectors } from "./Sectors.js";
import { industry } from "./Industry.js";
// Function to fetch news for each keyword
function fetchNews(keyword) {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&sortBy=popularity&apiKey=${apiKey}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch news for keyword: ${keyword}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (!data || !data.articles || data.articles.length === 0) {
                throw new Error(`No articles found for keyword: ${keyword}`);
            }
            displayArticles(data.articles);
        })
        .catch(error => {
            console.error('Error fetching or displaying news:', error.message);
        });
}

// Function to display articles
function displayArticles(articles) {
    articles.forEach(article => {
        const listItem = document.createElement('li');

        if (article.urlToImage) {
            const image = document.createElement('img');
            image.src = article.urlToImage;
            image.alt = 'Article Image';
            listItem.appendChild(image);
        }
        const description = document.createElement('p');
        description.textContent = article.description;
        listItem.appendChild(description);
        const link = document.createElement('a');
        link.textContent = 'Read More';
        link.href = article.url;
        description.appendChild(link);

        newsList.appendChild(listItem);
    });
}

// Fetch news for each keyword
/*suggestions.forEach(keyword => {
    fetchNews(keyword + ' stock');
});*/

/*companyNames.forEach(keyword => {
    fetchNews(keyword);
});*/

Sectors.forEach(keyword => {
    fetchNews(keyword);
});

industry.forEach(keyword => {
    fetchNews(keyword);
});