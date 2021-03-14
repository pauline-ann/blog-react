import React, { useState, useEffect } from "react";
import { Container, Header, Image, Icon, Rating, Divider, List } from "semantic-ui-react";
import axios from 'axios';
import sample from "../assets/images/ramen.jpg";
import moment from 'moment';

const Post = (props) => {

    const [post, setPost] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        location: '',
        rating: {
            aesthetic: 0,
            vibes: 0
        }
    });

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

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts/' + props.match.params.id)
                .then((res) => {
                    // handle success
                    console.log(res);
                    setPost({
                        title: res.data.title,
                        description: res.data.description,
                        content: res.data.content,
                        category: res.data.category,
                        location: res.data.location,
                        rating: {
                            aesthetic: res.data.rating.aesthetic,
                            vibes: res.data.rating.vibes
                        },
                        date: moment(res.data.createdAt).format('dddd, MMMM Do YYYY')
                    });
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [props.match.params.id])

    let aRating;
    let vRating;

    if (post.rating.aesthetic > 0) {
        aRating = (
            <Rating icon='star' defaultRating={post.rating.aesthetic} maxRating={5} disabled />
        )
    }

    if (post.rating.vibes > 0) {
        vRating = (
            <Rating icon='star' defaultRating={post.rating.vibes} maxRating={5} disabled />
        )
    }

    return (
        <div>
            <Container text>
                <Header sub style={postSubStyle}>{post.category}</Header>
                <Header as="h1" style={postHeaderStyle}>{post.title}</Header>
                <p style={postDescriptionStyle}>{post.description}</p>
                <Header.Subheader>
                    <List horizontal>
                        <List.Item>
                            <Icon name="map pin" size="large" color="orange" />
                            {post.location}
                        </List.Item>
                        <List.Item>Aesthetic: {aRating}</List.Item>
                        <List.Item>Vibes: {vRating}</List.Item>
                    </List>
                </Header.Subheader>
                <p style={postDateStyle}>{post.date}</p>
                <Divider />
                <Image src={sample} fluid />
                <Divider />
                {post.content}
            </Container>
        </div >
    );
}

export default Post;