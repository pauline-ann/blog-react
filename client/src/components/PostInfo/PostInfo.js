import React, { useEffect, useState } from "react";
import { Container, Header, Icon, Rating, Divider, List, Image, Grid } from "semantic-ui-react";
import ImageFadeIn from "react-image-fade-in";
import parse from 'html-react-parser';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon
} from "react-share";
import axios from 'axios'
import { Link } from 'react-router-dom';

// CSS
import './PostInfo.css';

const PostInfo = (props) => {

    const [state, setState] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts/')
                .then((res) => {
                    // handle success
                    console.log(res);
                    let postIDarray = [];
                    res.data.forEach(post => {
                        postIDarray.push(post._id)
                    });
                    setState(postIDarray);
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [])

    // Get next and last post ID's (if they exist)
    let currentIndex = state.indexOf(props.id)
    let prevIndex;
    let nextIndex;
    // If first post
    if (currentIndex === 0) {
        prevIndex = null;
        nextIndex = currentIndex + 1;
        // If last post
    } else if (currentIndex === (state.length - 1)) {
        prevIndex = currentIndex - 1;
        nextIndex = null;
    } else {
        prevIndex = currentIndex - 1;
        nextIndex = currentIndex + 1;
    }

    // Set up ratings
    let aRating;
    let vRating;
    let fRating;

    if (props.aesthetic > 0) {
        aRating = (
            <Rating icon='star' defaultRating={props.aesthetic} maxRating={5} disabled />
        )
    }
    if (props.vibes > 0) {
        vRating = (
            <Rating icon='star' defaultRating={props.vibes} maxRating={5} disabled />
        )
    }
    if (props.flavor > 0) {
        fRating = (
            <Rating icon='star' defaultRating={props.flavor} maxRating={5} disabled />
        )
    }

    return (
        <div>
            <Container text className='postinfo-container' >
                <Header sub className='postinfo-sub'>{props.category}</Header>
                <Header as="h1" className='postinfo-header'>{props.title}</Header>
                <p className='postinfo-description'>{props.description}</p>
                <Header.Subheader>
                    <List horizontal>
                        <List.Item>
                            <Icon name="map pin" size="large" color="orange" />
                            {props.location}
                        </List.Item>
                        <List.Item>Aesthetic: {aRating}</List.Item>
                        <List.Item>Vibes: {vRating}</List.Item>
                        <List.Item>Flavor: {fRating}</List.Item>
                    </List>
                </Header.Subheader>
                <p className='postinfo-date'>{props.date}</p>
                <List horizontal>
                    <EmailShareButton
                        subject={`${props.title} | Foodie App`}>
                        <EmailIcon size={27} round />
                    </EmailShareButton>
                    <FacebookShareButton
                        url={`https://foodie-react-blog.herokuapp.com/post/${props.id}`}
                        quote={"Foodie App - Discover your next foodie adventure!"}
                        hashtag="#foodieapp">
                        <FacebookIcon size={27} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                        title={props.title}
                        url={`https://foodie-react-blog.herokuapp.com/post/${props.id}`}
                        hashtags={['foodieapp', `${props.category}`]}>
                        <TwitterIcon size={27} round />
                    </TwitterShareButton>
                </List>
                <Divider section />
                <Image fluid>
                    <ImageFadeIn src={`/api/images/render/${props.fileName}`} />
                </Image>
                <Divider section />
                {parse(props.content)}
                <Divider section />
                {/* Post Navigation / Social Media Share */}
                <Grid>
                    <Grid.Row columns='equal'>
                        {prevIndex !== null
                            ?
                            <Grid.Column textAlign='left'>
                                <Link to={`/post/${state[prevIndex]}`}>
                                    <Icon name='angle double left' size='big' /> Previous Post
                                </Link>
                            </Grid.Column>
                            :
                            null
                        }
                        {nextIndex !== null
                            ?
                            <Grid.Column textAlign='right'>
                                <Link to={`/post/${state[nextIndex]}`}>
                                    Next Post <Icon name='angle double right' size='big' />
                                </Link>
                            </Grid.Column>
                            :
                            null
                        }
                    </Grid.Row>
                </Grid>
            </Container>
        </div >
    );
}

export default PostInfo;