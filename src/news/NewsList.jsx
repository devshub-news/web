import { Button } from "@material-ui/core"
import { useEffect, useState } from "react"
import { getChips } from "../common/categories"
import NewItem from "./NewItem"
import NewsAPI from "./NewsAPI"


const NewsList = (props) => {

    const [latestTopicNews, setLatestTopicNews] = useState([])

    useEffect(() => {
        let isMounted = true;
        NewsAPI.getNews(props.topic, 8).then(response => {
          if (isMounted) {
            if(response !== undefined){
                response.data.forEach(newItem => {
                    newItem.chips = getChips(newItem.classification)
                })
                setLatestTopicNews(response.data)
            }
          }
        })
        return () => { isMounted = false };
      }, [props.topic]);  

    return (
        <div style={{marginBottom: "40px"}}>
            <a style={{ display: "flex", justifyContent: "space-between" }} href={`#/topic/${props.topic}`}>
                <h1 className="news-title">{props.title}</h1>
                <Button variant="contained" color="primary" style={{ margin: "auto 20px" }}>
                    See more
                </Button>
            </a>

            <div className="news-items-container">

                {latestTopicNews.length > 0 && latestTopicNews.map(newItem => (
                    <NewItem newItem={newItem} key={newItem.id}></NewItem>
                ))}
            </div>
        </div>
    )
}


export default NewsList