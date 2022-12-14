// URLS
const LATEST_NEWS = "https://newsapi.org/v2/everything?q=all&pageSize=20&apiKey=991a1731e00a4b5a83bb6b22ca744fcc"
const NEWS_SOURCES = "https://newsapi.org/v2/top-headlines/sources?apiKey=991a1731e00a4b5a83bb6b22ca744fcc"
const HEADLINES = "https://newsapi.org/v2/top-headlines?country=us&apiKey=991a1731e00a4b5a83bb6b22ca744fcc"


// Dom has loaded
document.addEventListener('DOMContentLoaded', () => {

    // create a news item
    const newsItem = (image, title, description, link) => {

        const rootDiv = document.createElement('div');
        rootDiv.classList.add('col-4', 'p-1')

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-12', 'px-0', 'card', 'h-100')

        const newsImage = document.createElement('img');
        newsImage.classList.add('card-img-top')
        newsImage.src = image

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardHeader = document.createElement('h4');
        cardHeader.classList.add('card-title');
        cardHeader.innerText = title

        const cardText = document.createElement('p')
        cardText.classList.add('card-text')
        cardText.innerText = description

        const cardLink = document.createElement('a')
        cardLink.classList.add('btn', 'btn-primary', 'card-btn')
        cardLink.href = link
        cardLink.innerText = "VISIT"

        cardBody.appendChild(cardHeader)
        cardBody.appendChild(cardText)
        cardBody.appendChild(cardLink)

        cardDiv.appendChild(newsImage)
        cardDiv.appendChild(cardBody)

        rootDiv.appendChild(cardDiv)

        return rootDiv
    }


    // sources item
    const sourceItem = (name, description, url) => {

        const rootDiv = document.createElement('div')
        rootDiv.classList.add('col-4', 'p-2');

        const card = document.createElement('div');
        card.classList.add('card', 'col-12', 'px-0', 'h-100')

        const body = document.createElement('div');
        body.classList.add('card-body');

        const title = document.createElement('h4')
        title.classList.add('card-title');
        title.innerText = name

        const paragraph = document.createElement('p');
        paragraph.classList.add('card-text');
        paragraph.innerText = description;

        const link = document.createElement('a');
        link.classList.add('card-link', 'btn', 'btn-success');
        link.href = url;
        link.innerText = "OPEN PAGE"

        body.appendChild(title);
        body.appendChild(paragraph);
        body.appendChild(link);

        card.appendChild(body);

        rootDiv.appendChild(card);

        return rootDiv;

    }


    // load latest news
    const loadLatestNews = () => {

        fetch(LATEST_NEWS)
            .then((response) => response.json())
            .then((data) => {
                const articles = data.articles
                const newsItems = articles.map((article) => newsItem(
                    article.urlToImage,
                    article.title,
                    article.description,
                    article.url
                ))
                document.getElementById('latest').append(...newsItems)
            })

    }

    // load news sources
    const loadSources = () => {

        fetch(NEWS_SOURCES)
            .then((response) => response.json())
            .then((data) => {
                const sources = data.sources
                const sourceItems = sources.map((source) => sourceItem(
                    source.name,
                    source.description,
                    source.url
                ))
                document.getElementById('sources').append(...sourceItems)
            })

    }

    const loadHeadlines = () => {
        fetch(HEADLINES)
            .then((response) => response.json())
            .then((data) => {
                const articles = data.articles
                const newsItems = articles.map((article) => newsItem(
                    article.urlToImage,
                    article.title,
                    article.description,
                    article.url
                ))
                document.getElementById('headlines').append(...newsItems)
            })
    }

    // toggle menu
    const toggleMenu = (id) => {

        // hide all elements
        document.getElementById('latest').setAttribute('hidden', 'true')
        document.getElementById('sources').setAttribute('hidden', 'true')
        document.getElementById('headlines').setAttribute('hidden', 'true')

        // show relevant item
        document.getElementById(id).removeAttribute('hidden')

    }

    // menu clicks
    document.getElementById('nav-main').addEventListener('click', () => {
        toggleMenu('latest')
    })
    document.getElementById('nav-sources').addEventListener('click', () => {
        toggleMenu('sources')
    })
    document.getElementById('nav-headlines').addEventListener('click', () => {
        toggleMenu('headlines')
    })


    // call functions
    loadLatestNews()
    loadSources()
    loadHeadlines()

})