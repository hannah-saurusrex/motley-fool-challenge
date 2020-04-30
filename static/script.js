const articlesEl = document.getElementById('articles');
const filterBtn = document.getElementById('filter');
const topicFilter = filterBtn.querySelectorAll('li');
const marketsEl = document.getElementById('market');
let allArticles = []; // create globally scoped variable to iterate over in future.
let allInstruments = [];

// call API to pull in article data
async function getArticles() {
    const res = await fetch('http://127.0.0.1:8000/api/articles');
    const articles = await res.json();
    allArticles = articles.results;
}

// call instrument API to pull in market data
async function getInstrumentData() {
    console.log("processing request");
    const res = await fetch('http://127.0.0.1:8000/api/instruments');
    const marketData = await res.json();
    allInstruments = marketData;
}

const promise1 = getArticles();
const promise2 = getInstrumentData();

Promise.all([promise1, promise2]).then(function() {
    const initialData = allArticles.map(article => {
       const articleCompanyName = article.instruments[0].company_name;
       allInstruments.map(instrument => {
           const marketCompanyName = instrument.CompanyName;
           if (articleCompanyName === marketCompanyName) {
               article.instrument_stock_data = instrument;
           }
       })
       return article;
    })
    const showResults = initialData.slice(0,5); // show first 5 results
    displayArticles(showResults);
});

function displayArticles(articles) {
    articlesEl.innerHTML = '';

    articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.classList.add('article');
        const stockChange = (article.instrument_stock_data.PercentChange.Value * 100).toString().slice(0,4);
    
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
            <div>
                <h2>${article.instrument_stock_data.CompanyName}</h2>
                <p>Close Price: $${article.instrument_stock_data.CurrentPrice.Amount}</p>
                <p>${stockChange}%</p>
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

