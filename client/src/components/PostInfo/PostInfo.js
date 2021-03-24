import React from "react";
import { Container, Header, Icon, Rating, Divider, List, Image } from "semantic-ui-react";
import ImageFadeIn from "react-image-fade-in";

import './PostInfo.css';

const Post = (props) => {

    let aRating;
    let vRating;
    let fRating;

    if (props.aesthetic > 0) {
        aRating = (
            <Rating icon='star' defaultRating={props.aesthetic} maxRating={5} disabled />
        )
    }
    if (props.vibes > 0) {
        vRating = (
            <Rating icon='star' defaultRating={props.vibes} maxRating={5} disabled />
        )
    }
    if (props.flavor > 0) {
        fRating = (
            <Rating icon='star' defaultRating={props.flavor} maxRating={5} disabled />
        )
    }

    return (
        <div>
            <Container text className='postinfo-container'>
                <Header sub className='postinfo-sub'>{props.category}</Header>
                <Header as="h1" className='postinfo-header'>{props.title}</Header>
                <p className='postinfo-description'>{props.description}</p>
                <Header.Subheader>
                    <List horizontal>
                        <List.Item>
                            <Icon name="map pin" size="large" color="orange" />
                            {props.location}
                        </List.Item>
                        <List.Item>Aesthetic: {aRating}</List.Item>
                        <List.Item>Vibes: {vRating}</List.Item>
                        <List.Item>Flavor: {fRating}</List.Item>
                    </List>
                </Header.Subheader>
                <p className='postinfo-date'>{props.date}</p>
                <Divider />
                <Image fluid>
                    <ImageFadeIn src={`/api/images/render/${props.fileName}`} />
                </Image>
                <Divider />
                {props.content}
            </Container>
        </div >
    );
}

export default Post;