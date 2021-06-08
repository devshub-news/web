import './News.css'

import NewsBanner from '../news-banner/NewsBanner';
import NewsList from './NewsList';
import { useEffect, useState } from 'react';
import NewsAPI from './NewsAPI';
import { categories, getChips } from "../common/categories";

const News = () => {

    const [latestNews, setLatestNews] = useState([])

    useEffect(() => {
        let isMounted = true;
        NewsAPI.getNews(undefined, 6).then(response => {
          if (isMounted) {
            if(response !== undefined){
                response.data.forEach(newItem => {
                    newItem.chips = getChips(newItem.classification)
                })
                setLatestNews(response.data)
            }
          }
        })
        return () => { isMounted = false };
      }, []);

    return <div className="news-container">
        <div className="news-banner-container">
            <NewsBanner news={latestNews}></NewsBanner>
        </div>
        <div className="news-content">
            {Object.entries(categories).map(([category, categoryName]) => (
                <NewsList title={categoryName} topic={category} key={category}></NewsList>
            ))}
        </div>
    </div>
}

export default News