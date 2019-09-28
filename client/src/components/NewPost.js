import React, { useState } from "react";
import { Container, Form, Rating, Message } from "semantic-ui-react";
import axios from 'axios';

const NewPost = (props) => {

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        content: '',
        category: 'food',
        location: '',
        aesthetic: 0,
        vibes: 0,
        titleError: false,
        descError: false,
        contentError: false,
        categoryError: false,
        locationError: false,
        aestheticError: false,
        vibesError: false,
        formError: false
    });

    const handleSubmit = (event) => {

        // Prevent page refresh
        event.preventDefault();

        // Check form submission for errors
        let error = false;
        if (inputs.title === '') {
            setInputs(inputs => ({ ...inputs, titleError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, titleError: false }))
        }
        if (inputs.description === '') {
            setInputs(inputs => ({ ...inputs, descError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, descError: false }))
        }
        if (inputs.location === '') {
            setInputs(inputs => ({ ...inputs, locationError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, locationError: false }))
        }
        if (inputs.category === '') {
            setInputs(inputs => ({ ...inputs, categoryError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, categoryError: false }))
        }
        if (inputs.aesthetic === 0) {
            setInputs(inputs => ({ ...inputs, aestheticError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, aestheticError: false }))
        }
        if (inputs.vibes === 0) {
            setInputs(inputs => ({ ...inputs, vibesError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, vibesError: false }))
        }
        if (inputs.content === '') {
            setInputs(inputs => ({ ...inputs, contentError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, contentError: false }))
        }
        if (error) {
            setInputs(inputs => ({ ...inputs, formError: true }))
            return
        }

        // If no errors, make POST request to server
        const newPost = {
            title: inputs.title,
            description: inputs.description,
            content: inputs.content,
            category: inputs.category,
            location: inputs.location,
            aesthetic: inputs.aesthetic,
            vibes: inputs.vibes
        }

        axios.post('/api/posts/new', newPost)
            .then(res => console.log(res.data));

        // Refresh state
        setInputs(inputs => ({ ...inputs, formError: false }))
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const handleAestheticRating = (event, {rating}) => {
        setInputs(inputs => ({ ...inputs, aesthetic: rating}))
    }

    const handleVibesRating = (event, {rating}) => {
        setInputs(inputs => ({ ...inputs, vibes: rating}))
    }

    const options = [
        { key: 'f', text: 'Food', value: 'food' }
    ]

    return (
        <div>
            <Container>
                <h2>New post</h2>
                <Form
                    onSubmit={(event) => handleSubmit(event)}
                    error={inputs.formError}
                >
                    <Form.Field>
                        <label>Title</label>
                        <Form.Input
                            name='title'
                            value={inputs.title}
                            onChange={handleInputChange}
                            error={inputs.titleError}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Form.Input
                            name='description'
                            value={inputs.description}
                            onChange={handleInputChange}
                            error={inputs.descError}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Location</label>
                            <Form.Input
                                name='location'
                                value={inputs.location}
                                onChange={handleInputChange}
                                error={inputs.locationError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Category</label>
                            <Form.Select
                                fluid
                                options={options}
                                name='category'
                                value={options[0].value}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Aesthetic</label>
                            <Rating
                                maxRating={5}
                                defaultRating={inputs.aesthetic}
                                name='aesthetic'
                                value={inputs.aesthetic}
                                onRate={handleAestheticRating}
                                icon='star'
                                error={inputs.aestheticError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Vibes</label>
                            <Rating
                                maxRating={5}
                                defaultRating={inputs.vibes}
                                name='vibes'
                                value={inputs.vibes}
                                onRate={handleVibesRating}
                                icon='star'
                                error={inputs.vibesError}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.TextArea
                        name='content'
                        value={inputs.content}
                        onChange={handleInputChange}
                        placeholder='How was your meal?'
                        error={inputs.contentError}
                    />
                    {inputs.formError
                        ?
                        <Message
                            error
                            header="Incomplete Submission"
                            content="Please fill out the required fields."
                        />
                        :
                        null
                    }
                    <Form.Button
                        color="teal"
                        type='submit'
                    >
                        Submit
                    </Form.Button>
                </Form>
            </Container>
        </div >
    );
}

export default NewPost;