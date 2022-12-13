// URLS
const LATEST_NEWS = "https://newsapi.org/v2/everything?q=all&pageSize=20&apiKey=991a1731e00a4b5a83bb6b22ca744fcc"


// Dom has loaded
document.addEventListener('DOMContentLoaded', () => {

    // create a news item
    const newsItem = (image, title, description, link) => {

        const rootDiv = document.createElement('div');
        rootDiv.classList.add('col-4', 'p-1')

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-12', 'px-0', 'card')

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


    // call functions
    loadLatestNews()

})