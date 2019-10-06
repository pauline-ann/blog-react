import React, { useState, useEffect } from "react";
import { Container, Header, Image, Icon, Rating, Divider, List } from "semantic-ui-react";
import axios from 'axios';
import sample from "../assets/images/ramen.jpg";

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
                        }
                    });
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [])

    let aRating;
    let vRating;

    if (post.rating.aesthetic > 0) {
        aRating = (
            <Rating icon='star' defaultRating={post.rating.aesthetic} maxRating={5} />
        )
    }

    if (post.rating.vibes > 0) {
        vRating = (
            <Rating icon='star' defaultRating={post.rating.vibes} maxRating={5} />
        )
    }

    return (
        <div>
            <Container text>
                <Header as="h1">{post.title}</Header>
                <Header.Subheader>
                    <List horizontal>
                        <List.Item>
                            <Icon name="map pin" size="large" color="red"/>
                            {post.location}
                        </List.Item>
                        <List.Item>Aesthetic: {aRating}</List.Item>
                        <List.Item>Vibes: {vRating}</List.Item>
                    </List>
                </Header.Subheader>
                <Divider />
                <Image src={sample} fluid />
                <Divider />
                {post.content}
            </Container>
        </div >
    );
}

export default Post;