// ToDos: 
// API call
// search
// filter
// modal??
const articlesEl = document.getElementById('articles');
const filterBtn = document.getElementById('filter');
const searchEl = document.getElementById('search');


    
function displayArticles(articles) {
    articlesEl.innerHTML = '';
    
    articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.classList.add('article');
    
        articleEl.innerHTML = `
            <div>
                <img
                    src="${article.images[0].image}"
                    alt="${article.images[0].name}"
                />
            </div>
            <div class="article-body">
                <h2 class="article-headline">${article.headline}</h2>
                <h4>${article.byline} | ${article.publish_at}</h4>
                <p>${article.promo}</p>
            </div>
        `; // google timestame formatter
        articlesEl.appendChild(articleEl);
    });
}

// show & hide the filter dropdown options list
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});

async function getArticles() {
    const res = await fetch('http://127.0.0.1:8000/api/articles');
    const articles = await res.json();
    displayArticles(articles.results);
}

getArticles();

// search input function
searchEl.addEventListener('input', e => {
    const { value } = e.target;
    const articleHeadline = document.querySelectorAll('.article-headline');

    articleHeadline.forEach(headline => {
        if (headline.innerText.toLowerCase().includes(value.toLowerCase())) {
            headline.parentElement.parentElement.style.display = 'block';
        } else {
            headline.parentElement.parentElement.style.display = 'none';
        }
    });
});
