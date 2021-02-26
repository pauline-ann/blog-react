import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Segment, Image, Card, Divider } from "semantic-ui-react";

import ramen from '../assets/images/ramen.jpg';

// Featured Posts

const FeaturedPosts = (props) => {

    // Styling objects
    const postCardCategory = {
        color: 'rgb(231, 159, 49)',
        textTransform: 'uppercase',
        fontSize: '.9rem',
        marginBottom: '10px'
    }

    const postCardHeader = {
        fontSize: '1.3rem',
        fontFamily: 'Noto Serif, serif',
        fontWeight: '900'
    }

    // Initiate state to store featured post IDs
    const [data, setData] = useState({
        featuredIDs: [],
        featuredTitles: [],
        featuredCategories: []
    });

    // Create hash of post data, key'd by ID
    const createHash = (posts) => {
        const hash = {};

        posts.forEach(post => {
            hash[post._id] = { title: post.title, category: post.category }
        });

        createDataArrays(hash)
    }

    const createDataArrays = (hash) => {

        let titlesArray = [];
        console.log(hash)
        titlesArray.push(hash[data.featuredIDs[0]].title)
        titlesArray.push(hash[data.featuredIDs[1]].title)
        titlesArray.push(hash[data.featuredIDs[2]].title)

        let categoriesArray = [];
        categoriesArray.push(hash[data.featuredIDs[0]].category)
        categoriesArray.push(hash[data.featuredIDs[1]].category)
        categoriesArray.push(hash[data.featuredIDs[2]].category)

        // //Update category and title arrays in state
        setData(data => ({ ...data, featuredTitles: titlesArray, featuredCategories: categoriesArray }))
    }

    // Hook to grab posts from api
    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/featured')
                .then((res) => {
                    // handle success
                    console.log(res)
                    if (res.data.length === 0 || res.data === undefined) {
                        //output = (<div></div>)
                    } else {
                        // output = (

                        // )

                        // Save array in state
                        setData(data => ({ ...data, featuredIDs: Object.values(res.data[0]).slice(1, 4) }))

                        // Call function to create hash
                        createHash(props.posts)
                    }
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [props])

    return (
        <div>
            <Grid columns='equal' divided>
                <Grid.Row stretched>
                    <Grid.Column width={10}>
                        <Card
                            href={'/post/' + data.featuredIDs[0]}
                            fluid>
                            <Image
                                src={ramen}
                                ui={false}
                            />
                            <Card.Content>
                                <Card.Meta style={postCardCategory}>
                                    {data.featuredCategories[0]}
                                </Card.Meta>
                                <Card.Header style={postCardHeader}>
                                    {data.featuredTitles[0]}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            href={'/post/' + data.featuredIDs[1]}
                            fluid>
                            <Image
                                src={ramen}
                                ui={false}
                            />
                            <Card.Content>
                                <Card.Meta style={postCardCategory}>
                                    {data.featuredCategories[1]}
                                </Card.Meta>
                                <Card.Header style={postCardHeader}>
                                    {data.featuredTitles[1]}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                        <Card
                            href={'/post/' + data.featuredIDs[2]}
                            fluid>
                            <Image
                                src={ramen}
                                ui={false}
                            />
                            <Card.Content>
                                <Card.Meta style={postCardCategory}>
                                    {data.featuredCategories[2]}
                                </Card.Meta>
                                <Card.Header style={postCardHeader}>
                                    {data.featuredTitles[2]}
                                </Card.Header>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider section hidden />
        </div>
    );
}

export default FeaturedPosts;