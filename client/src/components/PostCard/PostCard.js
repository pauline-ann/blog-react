import React from "react";
import { Card, Image, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ImageFadeIn from 'react-image-fade-in';

import './PostCard.css';

const PostCard = (props) => {

    return (
        <Grid.Column>
            <Link to={"/post/" + props.id}>
                <Card
                    fluid
                    className='postcard-card'>
                    <Image wrapped>
                        <ImageFadeIn src={`/api/images/render/${props.fileName}`} />
                    </Image>
                    <Card.Content>
                        <Card.Meta className='postcard-category'>{props.category}</Card.Meta>
                        <Card.Header className='postcard-header'>
                            {props.title}
                        </Card.Header>
                        <Card.Description>
                            {props.description.slice(0, 30) + '...'}
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Link>
        </Grid.Column>
    )
}

export default PostCard;