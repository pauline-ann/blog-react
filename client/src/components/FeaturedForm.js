import React, { useState, useEffect } from "react";
import { Container, Form, Select, List } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Custom hooks
import { useFeaturedForm } from './CustomHooks';

const FeaturedForm = React.memo(props => {

    // Declare options array for dropdown
    const postOptions = [];

    // Function that dynamically turns posts into options in dropdown
    const setOptions = (posts) => {

        console.log(posts)

        // Iterate through posts and create dropdown option for each one
        posts.map(post => {

            // STUDY THIS, NEEDS TO BE INSIDE .MAP FUNCTION OR IT GETS OVERWRITTEN
            // Create empty post option object
            let postOption = {
                key: '',
                text: '',
                value: ''
            };

            postOption.key = post._id
            postOption.text = post.title
            postOption.value = post._id

            postOptions.push(postOption);

            console.log(postOptions)
        })
    }

    // Call api to gather posts, then call setOptions function
    axios.get('/api/posts')
        .then((res) => {
            // handle success
            console.log('axios get success')
            setOptions(res.data)
        })
        .catch((err) => {
            // handle error
            console.log(err);
        });

    // Redirect to homepage when form is successfully submitted
    // if (form is submitted) {
    // return <Redirect to={'/post/' + inputs.postID} />
    //}

    return (
        <React.Fragment>
            <Container>
                <Form
                // onSubmit={(event) => handleSubmit(event)}
                // error={inputs.formError}
                >
                    <Form.Group widths='equal'>
                        <Form.Select
                            fluid
                            label='Main feature'
                            options={postOptions}
                            placeholder='Select'
                        />
                        <Form.Select
                            fluid
                            label='Sub feature 1'
                            options={postOptions}
                            placeholder='Select'
                        />
                        <Form.Select
                            fluid
                            label='Sub feature 2'
                            options={postOptions}
                            placeholder='Select'
                        />
                    </Form.Group>
                </Form>
            </Container>
        </React.Fragment>
    );
})

export default FeaturedForm;