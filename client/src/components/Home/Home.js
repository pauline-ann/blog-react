import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Divider, Grid, Segment, Header, Image } from "semantic-ui-react";
import moment from 'moment';

//Components
import PostCard from "../PostCard/PostCard";

//CSS
import './Home.css';

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
            <div
                className='home-header'
            >
                <Container text>
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </Container>
            </div>
            <Container
                className='home-latest-posts'
            >
                <Divider horizontal section>Latest Posts</Divider><br />
                <Grid doubling stackable columns={3}>
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