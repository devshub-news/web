import './News.css'

import NewsBanner from '../news-banner/NewsBanner';
import NewsList from './NewsList';
import { useEffect, useState } from 'react';
import NewsAPI from './NewsAPI';
import { categories, getChips } from "../common/categories";

const News = (props) => {

    const [latestNews, setLatestNews] = useState([])

    useEffect(() => {
        let isMounted = true;               // note mutable flag
        NewsAPI.getNews(undefined, 6).then(response => {
          if (isMounted) {
            if(response !== undefined){
                response.data.forEach(newItem => {
                    newItem.chips = getChips(newItem.classification)
                })
                setLatestNews(response.data)
            }
          }    // add conditional check
        })
        return () => { isMounted = false }; // use cleanup to toggle value, if unmounted
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