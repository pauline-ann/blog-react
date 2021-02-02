import React from "react";
import { Item, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";

import sample from "../assets/images/ramen.jpg";

const PostCard = (props) => {

    const postCardLink = {
        'font-size': '1.3rem',
        'font-weight': '700 !important'
    }

    return (
        <Item>
            <Item.Image size='medium' src={sample} />
            <Item.Content>
                <Link to={"/post/" + props.id}><Item.Header as='a' style={postCardLink}>{props.title}</Item.Header></Link>
                <Item.Description>{props.description}</Item.Description>
                <Item.Extra>
                    Aesthetic: <Rating icon='star' defaultRating={props.aesthetic} maxRating={5} />
                    Vibes:   <Rating icon='star' defaultRating={props.vibes} maxRating={5} />
                </Item.Extra>
                <br />
                <Link to={"/post/" + props.id}>Read more...</Link>
            </Item.Content>
        </Item>
    )
}

export default PostCard;