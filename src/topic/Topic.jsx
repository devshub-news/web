import { useEffect, useState } from "react"
import { categories, getChips } from "../common/categories"
import NewsBanner from "../news-banner/NewsBanner"
import NewItem from "../news/NewItem"
import NewsAPI from "../news/NewsAPI"

import './Topic.css'


const Topic = (props) => {

    window.title.innerHTML = categories[props.match.params.category] + " - Devshub"

    const [latestNews, setLatestNews] = useState([])

    useEffect(() => {
        let isMounted = true;
        NewsAPI.getNews(props.match.params.category).then(response => {
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
      }, [props.match]);


    return <div className="news-container">
        <div className="news-banner-container">
            <NewsBanner news={latestNews.slice(0, 7)}></NewsBanner>
        </div>
        <h1 className="topic-title">{categories[props.match.params.category].toUpperCase()}</h1>
        <div className="topic-news-container">
            {latestNews.map(newItem => (
                <NewItem newItem={newItem} key={newItem.id}></NewItem>
            ))}
        </div>
    </div>
}

export default Topic