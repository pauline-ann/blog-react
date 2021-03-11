import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Item, Divider } from "semantic-ui-react";
import moment from 'moment';

//Components
import PostCard from "./PostCard";

//Homepage
const Home = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts')
                .then((res) => {
                    // handle success
                    console.log(res);
                    setPosts(res.data);
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
                <Item.Group>
                    {posts.reverse().map((post, i) => {

                        let date = moment(post.updatedAt).format('dddd, MMMM Do YYYY');

                        return <PostCard
                            title={post.title}
                            description={post.description}
                            content={post.content}
                            category={post.category}
                            location={post.location}
                            aesthetic={post.rating.aesthetic}
                            vibes={post.rating.vibes}
                            id={post._id}
                            key={i}
                            time={date}
                        />
                    }
                    )}
                </Item.Group>
            </Container>
        </div>
    );
}

export default Home;