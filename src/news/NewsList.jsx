import { Button } from "@material-ui/core"
import NewItem from "./NewItem"


const NewsList = (props) => {

    return (
        <>
            {props.topic && (
                <a style={{ display: "flex", justifyContent: "space-between" }} href={`/#/topic/${props.topic}`}>
                    <h1 className="news-title">{props.title}</h1>
                    <Button variant="contained" color="primary" style={{ margin: "auto 20px" }}>
                        See more
                    </Button>
                </a>
            )}

            {props.topic? '': (
                <h1 className="news-title">{props.title}</h1>
            )}

            <div className="news-items-container">
                {props.news.map(newItem => (
                    <NewItem newItem={newItem}></NewItem>
                ))}
            </div>
        </>
    )
}


export default NewsList