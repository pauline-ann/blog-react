import React from "react";
import { Container, Icon, Image, Item, Rating } from "semantic-ui-react";

import sample from "../assets/images/sample.png";

const Post = (props) => {

    return (
        <Item>
            <Item.Image size='medium' src={sample} />
            <Item.Content>
                <Item.Header as='a'>{props.title}</Item.Header>
                <Item.Description>{props.description}</Item.Description>
                <Item.Extra>
                    Aesthetic: <Rating icon='star' defaultRating={props.aesthetic} maxRating={5} />
                    Vibes:   <Rating icon='star' defaultRating={props.vibes} maxRating={5} />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}

export default Post;