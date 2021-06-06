import { Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@material-ui/core"
import * as timeago from 'timeago.js';

const NewItem = (props) => {


    return <Card className="news-item">
        <CardActionArea>
            <CardMedia style={{ height: "145px", filter: "brightness(0.7)" }}
                image={props.newItem.image}
                title="Post image"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" style={{ marginBottom: "10px" }}>
                    {props.newItem.from} - {timeago.format(props.date)}
                </Typography>
                <Typography gutterBottom variant="h6" component="h2">
                    {props.newItem.title}
        </Typography>
                <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap" }}>
                    <Chip label="Web Development" color="primary" />
                    <Chip label="Career" color="default" />
                </div>
            </CardContent>
        </CardActionArea>
    </Card>
}

export default NewItem