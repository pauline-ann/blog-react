import React, { useState, useEffect } from "react";
import axios from 'axios';
import { List, Image } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';

import sample from "../assets/images/ramen-icon.png";

const PostList = (props) => {

    // Component Styling
    const listItemStyle = {
        'padding': '.75em 0',
        'display': 'block'
    }

    // Initiate state to store and list posts
    const [posts, setPosts] = useState([]);

    // Hook to grab posts from api
    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts')
                .then((res) => {
                    // handle success
                    setPosts(res.data);
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [])

    // Get api info
    const getPosts = () => {
        axios.get('/api/posts')
            .then((res) => {
                // handle success
                setPosts(res.data);
            })
            .catch((err) => {
                // handle error
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <List divided verticalAlign='middle'>
                {posts.map((post, i) => {
                    console.log(post)
                    return (
                        <List.Item
                            style={listItemStyle}
                            key={post._id}>
                            <Image avatar src={sample} />
                            <List.Content>
                                <List.Header>{post.title}</List.Header>
                                <List.Description>
                                    {post.description}
                                </List.Description>
                            </List.Content>
                            {/* DELETE POST BUTTON/MODAL */}
                            <DeleteModal id={post._id} getPosts={getPosts} />
                            {/* EDIT POST BUTTON/MODAL */}
                            <UpdateModal
                                title={post.title}
                                description={post.description}
                                content={post.content}
                                category={post.category}
                                location={post.location}
                                aesthetic={post.rating.aesthetic}
                                vibes={post.rating.vibes}
                                id={post._id}
                            />
                        </List.Item>)
                })}
            </List>
        </React.Fragment>
    );
}

export default PostList;