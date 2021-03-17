import React from "react";
import { Item, Rating } from "semantic-ui-react";
import { Link } from "react-router-dom";

const PostCard = (props) => {

    const postCardHeader = {
        fontSize: '1.3rem',
        fontFamily: 'Noto Serif, serif',
        fontWeight: '900'
    }

    const postCardCategory = {
        color: 'rgb(231, 159, 49)',
        textTransform: 'uppercase',
        fontSize: '.9rem',
        marginBottom: '10px'
    }

    const postCardDate = {
        fontStyle: 'italic'
    }

    return (
        <Item>
            <Item.Image size='medium' src={`/api/images/render/${props.fileName}`} />
            <Item.Content>
                <Item.Meta style={postCardCategory}>{props.category}</Item.Meta>
                <Link to={"/post/" + props.id}><Item.Header style={postCardHeader}>{props.title}</Item.Header></Link>
                <Item.Extra style={postCardDate}>{props.date}</Item.Extra>
                <Item.Extra>
                    Aesthetic: <Rating icon='star' defaultRating={props.aesthetic} maxRating={5} disabled />
                    Vibes:   <Rating icon='star' defaultRating={props.vibes} maxRating={5} disabled />
                    Flavor:   <Rating icon='star' defaultRating={props.flavor} maxRating={5} disabled />
                </Item.Extra>
                <Item.Description>{props.description}</Item.Description>
                <br />
                <Link to={"/post/" + props.id}>Read more...</Link>
            </Item.Content>
        </Item>
    )
}

export default PostCard;