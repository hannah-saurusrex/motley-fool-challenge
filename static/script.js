const articlesEl = document.getElementById('articles');
const filterBtn = document.getElementById('filter');
const topicFilter = filterBtn.querySelectorAll('li');
const marketsEl = document.getElementById('market');
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

// call instrument API to pull in market data
async function getInstrumentData() {
    console.log("processing request");
    const res = await fetch('http://127.0.0.1:8000/api/instruments');
    const marketData = await res.json();
    displayInstrumentData(marketData);
     // filter by stock up today,
    // filter by stock down today
    // filter by stock highest close price
    // filter by stock lowest close price
    
}
console.log(getInstrumentData());

function displayInstrumentData(stocks) {
    marketsEl.innerHTML = '';

    stocks.forEach(stock => {
        const marketEl = document.createElement('div');
        marketEl.classList.add('stock-data');
        // need CompanyName, ClosePrice, OpenPrice, current share price...?

        marketEl.innerHTML = `
        <div class="stock-data__card">
            <h2 class="stock-data__name">${stock.CompanyName}</h2>
            <p class="pricing">Open Price: $${stock.OpenPrice.Amount}</p>
            <p class="pricing">Close Price: $${stock.ClosePrice.Amount}</p>
            <p class="pricing">Current Price: $${stock.CurrentPrice.Amount}</p>
        </div>
        `;
        marketsEl.appendChild(marketEl);
    });
}

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

