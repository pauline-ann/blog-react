import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Divider, Grid, Header, Button } from "semantic-ui-react";
import moment from 'moment';

//Components
import PostCard from "../PostCard/PostCard";

//CSS
import './Home.css';
import { Link } from "react-router-dom";

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
                <Container
                    className='home-textbox'
                    textAlign='center'
                >
                    <Header as='h1' className='home-textbox--text home-textbox--main'>A place for foodies to gather.</Header>
                    <Header as='h2' className='home-textbox--text' color='white'>Find your next meal.</Header>
                    <Divider hidden />
                    <Link to='/dashboard'>
                        <Button
                            inverted
                            size='big'
                            className='home-header--button'
                        >Share an Experience</Button>
                    </Link>
                    <a href='#latest-posts'>
                        <Button
                            inverted
                            size='big'
                            className='home-header--button'
                        >Latest Posts</Button>
                    </a>
                </Container>
            </div>
            <Container
                className='home-latest-posts'
                id='latest-posts'
            >
                <Divider horizontal section>Latest Posts</Divider><br />
                <Grid doubling stackable columns={4}>
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
        </div >
    );
}

export default Home;