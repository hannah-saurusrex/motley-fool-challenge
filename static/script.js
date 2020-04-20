// ToDos: 
// API call ✅
// search ✅
// filter via topic dropdown ✅
// filter via topic tags
// .slice(0,5) results to bring in top 5

const articlesEl = document.getElementById('articles');
const filterBtn = document.getElementById('filter');
const topicFilter = filterBtn.querySelectorAll('li');
const tagsBtn = document.getElementById('tags');


function displayArticles(articles) {
    articlesEl.innerHTML = '';
    
    articles.forEach(article => {
        const articleEl = document.createElement('div');
        articleEl.classList.add('article');
    
        articleEl.innerHTML = `
            <div class="article-image">
                <img
                    src="${article.images[0].image}"
                    alt="${article.images[0].name}"
                />
            </div>
            <div class="article-body">
                <h2 class="article-headline">${article.headline}</h2>
                <h4 class="article-byline">By ${article.byline}</h4>
                <p class="article-promo">${article.promo}</p>
            </div>
            <div class="tags article-bureau" id="tags">
                <span>${article.bureau.name}</span>
            </div>
        `;
        articlesEl.appendChild(articleEl);
    });
}

// pull in the article data
async function getArticles() {
    const res = await fetch('http://127.0.0.1:8000/api/articles');
    const articles = await res.json();
    displayArticles(articles.results);
}

getArticles();

// show & hide the filter dropdown options list
filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open');
});


// filter articles via topic dropdown
topicFilter.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const articleBureau = document.querySelectorAll('.article-bureau'); 
        
        articleBureau.forEach(bureau => {
            if (bureau.innerText.includes(value) || value === 'All') {
                bureau.parentElement.style.display = 'block';
            } else {
                bureau.parentElement.style.display = 'none';
            }
        });
    });
});

// filter articles via topic tag




