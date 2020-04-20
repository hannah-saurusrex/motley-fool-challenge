// ToDos: 
// API call ✅
// search ✅
// filter via topic dropdown ✅
// filter via topic tags
// .slice(0,5) results to bring in top 5
// format published_at timestamp
// modal??
const articlesEl = document.getElementById('articles');
// const searchEl = document.getElementById('search');
const filterBtn = document.getElementById('filter');
const topicFilter = filterBtn.querySelectorAll('li');

    
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
                <h4 class="article-byline">${article.byline} | ${article.publish_at}</h4>
            </div>
            <div class="article-body">
                <h2 class="article-headline">${article.headline}</h2>
                <p class="article-promo">${article.promo}</p>
            </div>
            <div class="tags article-bureau">
                <span>${article.bureau.name}</span>
            </div>
        `; // google timestame formatter
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

// search input function
// searchEl.addEventListener('input', e => {
//     const { value } = e.target;
//     const articleHeadline = document.querySelectorAll('.article-headline');

//     articleHeadline.forEach(headline => {
//         if (headline.innerText.toLowerCase().includes(value.toLowerCase())) {
//             headline.parentElement.parentElement.style.display = 'block';
//         } else {
//             headline.parentElement.parentElement.style.display = 'none';
//         }
//     });
// });


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

