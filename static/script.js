const articlesEl = document.getElementById('articles');

function displayArticles(articles) {
    articlesEl.innerHTML = '';

    articles.forEach(results => {
        const articleEl = document.createElement('div');
        articleEl.classList.add('card');

        articleEl.innerHTML = `
            <div>
                <img src="${results.images.image}" alt="${results.images.image}" />
            </div>
        `

        articlesEl.appendChild(articleEl);
    });
}

async function getArticles() {
    const res = await fetch('http://127.0.0.1:8000/api/articles');
    const articles = await res.json();

    displayArticles(articles);
}

getArticles();