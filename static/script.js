const articlesEl = document.getElementById('articles');
const filterBtn = document.getElementById('filter');
const topicFilter = filterBtn.querySelectorAll('li');
let allArticles = []; // create globally scoped variable to iterate over in future.

// call API to pull in article data
async function getArticles() {
    const res = await fetch('http://127.0.0.1:8000/api/articles');
    const articles = await res.json();
    allArticles = articles.results;
    const showResults = articles.results.slice(0,5); // show first 5 results
    displayArticles(showResults);
}
getArticles();

function displayArticles(articles) {
    articlesEl.innerHTML = '';

    articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.classList.add('article');
    
        articleEl.innerHTML = `
            <div class="article-image">
                <a href="${article.links.presentation}">
                    <img
                        src="${article.images[0].image}"
                        alt="${article.images[0].name}"
                    />
                </a>
            </div>
            <div class="article-body">
                <a class="article-link" href="${article.links.presentation}">
                    <h2 class="article-headline">${article.headline}</h2>
                    <h4 class="article-byline">By ${article.byline}</h4>
                    <p class="article-promo">${article.promo}</p>
                </a>
            </div>
            <div class="article-bureau" id="tags">
                <span class="tags">${article.bureau.name}</span>
            </div>
        `;
        articlesEl.appendChild(articleEl);
    });
}

// show & hide the filter dropdown options list
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
    // check .toggle w/ IE11;
});


// filter articles via topic dropdown
topicFilter.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
         
        const filteredResults = allArticles.filter(article => {
            if (article.bureau.name.includes(value) || value === 'All') {
                return true;
            } else {
                return false;
            }
        });
        displayArticles(filteredResults);
    });
});

// filter with topic tag
// with more time, would refactor so that click event is on tags. 
// But would need to make tags stateful, and reassign every time to update the dom, but figured this would do the trick for now :)
document.addEventListener('click', e => {
    if(e.target.className === 'tags') {
        const filteredTags = allArticles.filter(article => {
            if (article.bureau.name.includes(e.target.innerHTML)) {
                return true;
            }
        });
        displayArticles(filteredTags);
    };
});

