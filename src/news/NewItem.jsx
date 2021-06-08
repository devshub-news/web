import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"
import * as timeago from 'timeago.js';

const NewItem = (props) => {

    return <a href={props.newItem.url} target="_blank" rel="noreferrer">

        <Card className="news-item">
            <CardActionArea>
                <CardMedia style={{ height: "145px", filter: "brightness(0.7)" }}
                    image={props.newItem.image || "https://i.stack.imgur.com/y9DpT.jpg"}
                    title="Post image"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" style={{ marginBottom: "10px" }}>
                        {props.newItem.from} - {timeago.format(props.newItem.date)}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        {props.newItem.title}
                    </Typography>

                    <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}>
                        {props.newItem.chips}
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    </a>
}

export default NewItem