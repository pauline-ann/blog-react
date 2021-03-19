import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Item, Divider, Grid } from "semantic-ui-react";
import moment from 'moment';

//Components
import PostCard from "./PostCard/PostCard";

//Homepage
const Home = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts')
                .then((res) => {
                    // handle success
                    console.log(res);
                    setPosts(res.data.reverse());
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [])

    return (
        <div>
            <Container>
                <Divider horizontal>Latest Posts</Divider><br />
                <Grid columns={3}>
                    {posts.map((post, i) => {

                        let date = moment(post.createdAt).format('dddd, MMMM Do YYYY');

                        return <PostCard
                            title={post.title}
                            description={post.description}
                            content={post.content}
                            category={post.category}
                            location={post.location}
                            aesthetic={post.rating.aesthetic}
                            vibes={post.rating.vibes}
                            flavor={post.rating.flavor}
                            id={post._id}
                            fileName={post.photo.fileName}
                            key={i}
                            date={date}
                        />
                    }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default Home;