import React from "react";
import { Container, Header, Icon, Rating, Divider, List, Image } from "semantic-ui-react";
import ImageFadeIn from "react-image-fade-in";

const Post = (props) => {

    const postHeaderStyle = {
        marginTop: '0'
    }

    const postSubStyle = {
        color: 'rgb(231, 159, 49)'
    }

    const postDescriptionStyle = {
        fontSize: '.93em'
    }

    const postDateStyle = {
        fontSize: '.8em',
        fontStyle: 'italic'
    }

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
            <Container text>
                <Header sub style={postSubStyle}>{props.category}</Header>
                <Header as="h1" style={postHeaderStyle}>{props.title}</Header>
                <p style={postDescriptionStyle}>{props.description}</p>
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
                <p style={postDateStyle}>{props.date}</p>
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