import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const Post = (props) => {
    return (
        <>
            <Card sx={{ maxWidth: 2000 }} className = "mb-3">
                <div className="d-flex align-items">
                    <CardMedia
                        style={{ height: "400px", width: "400px" }}
                        className="col"
                        component="img"
                        image={props.image}
                    />
                    <CardContent className="col">
                        <h1>{props.title}</h1>
                        <p>{props.description}</p>
                        <p>{props.date}</p>
                        <CardActions className = "justify-content-center">
                            <Button size="small" className = "mt-auto">Donate</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </CardContent>

                </div>
            </Card>
        </>
    );
}

export default Post
