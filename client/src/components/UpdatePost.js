import React from "react";
import { Container, Form, Rating, Message } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

// redirect when submit

// Custom hooks
import { useUpdateForm } from './CustomHooks';

const UpdatePost = (props) => {

    const { inputs, handleInputChange, handleVibesRating, handleAestheticRating, handleSubmit } = useUpdateForm(props);

    // Category options
    const options = [
        { key: 'f', text: 'Food', value: 'food' }
    ]

    // Redirect to post page once form is submitted
    if (inputs.formSubmitted === true) {
        return <Redirect to={'/post/' + inputs.postID} />
    }

    return (
        <div>
            <Container>
                <Form
                    onSubmit={(event) => handleSubmit(event)}
                    error={inputs.formError}
                >
                    <Form.Field
                        error={inputs.titleError}
                    >
                        <label>Title</label>
                        <Form.Input
                            name='title'
                            value={inputs.title}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field
                        error={inputs.descError}

                    >
                        <label>Description</label>
                        <Form.Input
                            name='description'
                            value={inputs.description}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field
                            error={inputs.locationError}
                        >
                            <label>Location</label>
                            <Form.Input
                                name='location'
                                value={inputs.location}
                                onChange={handleInputChange}
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
                        <Form.Field
                            error={inputs.aestheticError}
                        >
                            <label>Aesthetic</label>
                            <Rating
                                maxRating={5}
                                defaultRating={inputs.aesthetic}
                                name='aesthetic'
                                value={inputs.aesthetic}
                                onRate={handleAestheticRating}
                                icon='star'
                            />
                        </Form.Field>
                        <Form.Field
                            error={inputs.vibesError}
                        >
                            <label>Vibes</label>
                            <Rating
                                maxRating={5}
                                defaultRating={inputs.vibes}
                                name='vibes'
                                value={inputs.vibes}
                                onRate={handleVibesRating}
                                icon='star'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field
                        error={inputs.contentError}
                    >
                        <Form.TextArea
                            name='content'
                            value={inputs.content}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
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
        </div >
    );
}

export default UpdatePost;