import React from "react";
import { Item, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";

import sample from "../assets/images/ramen.jpg";

//CSS
import "./PostCard.css";

const PostCard = (props) => {

    return (
        <Item>
            <Item.Image size='medium' src={sample} />
            <Item.Content>
                <Item.Header as='a' className='PostCard-title'>{props.title}</Item.Header>
                <Item.Description>{props.description}</Item.Description>
                <Item.Extra>
                    Aesthetic: <Rating icon='star' defaultRating={props.aesthetic} maxRating={5} />
                    Vibes:   <Rating icon='star' defaultRating={props.vibes} maxRating={5} />
                </Item.Extra>
                <br />
                <Link to={"/post/" + props.id}>Read more...</Link>
            </Item.Content>
        </Item>
    );
}

export default PostCard;