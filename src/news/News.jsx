import './News.css'

import NewsBanner from '../news-banner/NewsBanner';
import NewsList from './NewsList';

const News = () => {
    const bannerNews = [
        {
            "clasification": {
                "categories": {
                    "career": {
                        "keywords": {},
                        "percent": 0.0,
                        "total": 0
                    },
                    "web_development": {
                        "keywords": {
                            "design": 5,
                            "framework": 1,
                            "frontend": 1
                        },
                        "percent": 0.003745318352059925,
                        "total": 7
                    }
                }
            },
            "date": "2021-05-26T17:19:21.277Z",
            "from": "Medium",
            "image": "https://miro.medium.com/max/1200/0*qjP2M71XvThj869V",
            "title": "YAGNI & KISS Principles - Eugeniu Cozac - Medium",
            "url": "https://eugeniucozac.medium.com/yagni-kiss-principles-8274d5122457?source=topic_page---------0------------------1----------"

        },
        {
            "clasification": {
                "categories": {
                    "career": {
                        "keywords": {
                            "learning": 1,
                            "professional": 1
                        },
                        "percent": 0.0014858841010401188,
                        "total": 2
                    },
                    "web_development": {
                        "keywords": {
                            "css": 1,
                            "html": 3,
                            "page": 9,
                            "web": 7
                        },
                        "percent": 0.014858841010401188,
                        "total": 20
                    }
                }
            },
            "date": "2021-05-26T20:12:16.577Z",
            "from": "Medium",
            "image": "https://miro.medium.com/max/1200/1*hcKZe4hkZyfRbDcQlEgogw.jpeg",
            "title": "A Super-Simple PHP Tutorial for Beginning to Code â Part 3 â Working with Databases via PDO",
            "url": "https://johncoonrod.medium.com/a-super-simple-php-tutorial-for-beginning-to-code-part-3-working-with-databases-via-pdo-e32e0b929dfe?source=topic_page---------1------------------1----------"

        },
    ]


    return <div className="news-container">
        <div className="news-banner-container">
            <NewsBanner news={bannerNews}></NewsBanner>
        </div>
        <div className="news-content">
            <NewsList title="Latest Posts" news={[...bannerNews, ...bannerNews, ...bannerNews]}></NewsList>
            <br />
            <br />
            <NewsList title="Web development" news={bannerNews} topic="web_development"></NewsList>
            <br />
            <br />
            <NewsList title="Career" news={bannerNews} topic="career"></NewsList>
        </div>
    </div>
}

export default News