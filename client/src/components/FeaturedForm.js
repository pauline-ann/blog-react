import React, { useState, useEffect } from "react";
import { Container, Form, Select, List, Divider, Message } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

// Custom hooks
import { useFeaturedForm } from './CustomHooks';

const FeaturedForm = React.memo(props => {


    // Initiate Custom Hooks
    const { inputs, handleMainFeature, handleSubFeature, handleSubSubFeature, handleSubmit } = useFeaturedForm();

    // Declare options array for dropdown
    const postOptions = [];

    // Function that dynamically turns posts into options in dropdown
    const setOptions = (posts) => {

        console.log(posts)

        // Iterate through posts and create dropdown option for each one
        posts.forEach(post => {

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

            // Push post option object into options array
            postOptions.push(postOption);
        })
        console.log('Post Options:')
        console.log(postOptions)
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

    // TODO
    // Format custom hook for featured form
    // Format input validation
    // Check that all 3 are selected
    // Create models, api endpoints, for featured posts (store id?)
    // Based on which label, store in db as main feature, sub feature 1, and sub feature 2

    return (
        <React.Fragment>
            <Container>
                <Divider hidden />
                <Form
                    onSubmit={(event) => handleSubmit(event)}
                    error={inputs.formError}
                >
                    <Form.Select
                        fluid
                        label='Main feature'
                        options={postOptions}
                        placeholder='Select'
                        onChange={handleMainFeature}
                        value={inputs.mainFeatureID}
                    />
                    <Form.Select
                        fluid
                        label='Sub feature 1'
                        options={postOptions}
                        placeholder='Select'
                        onChange={handleSubFeature}
                        value={inputs.subFeatureID}
                    />
                    <Form.Select
                        fluid
                        label='Sub feature 2'
                        options={postOptions}
                        placeholder='Select'
                        onChange={handleSubSubFeature}
                        value={inputs.subSubFeatureID}
                    />
                    {inputs.formError
                        ?
                        <Message
                            error
                            header="Incomplete Submission"
                            content="Please select an option for each featured post."
                        />
                        :
                        null
                    }
                    <Divider section hidden />
                    <Container textAlign='center'>
                        <Form.Button
                            basic
                            color="yellow"
                            type='submit'
                        >
                            Submit
                    </Form.Button>
                    </Container>
                </Form>
            </Container>
        </React.Fragment>
    );
})

export default FeaturedForm;