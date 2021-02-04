import React from "react";
import { Container, Form, Rating, Message } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

// handle change in form with custom hook
// redirect when submit

// Custom hooks
import { useUpdateForm } from './CustomHooks';

const UpdatePost = (props) => {

    const { inputs } = useUpdateForm(props);

    // handleVibesRating, handleAestheticRating, handleInputChange, handleSubmit 

    // Category options
    const options = [
        { key: 'f', text: 'Food', value: 'food' }
    ]

    return (
        <div>
            <Container>
                <Form
                // onSubmit={(event) => handleSubmit(event)}
                // error={inputs.formError}
                >
                    <Form.Field>
                        <label>Title</label>
                        <Form.Input
                            name='title'
                            value={inputs.title}
                        // onChange={handleInputChange}
                        // error={inputs.titleError}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Form.Input
                            name='description'
                            value={inputs.description}
                        // onChange={handleInputChange}
                        // error={inputs.descError}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Location</label>
                            <Form.Input
                                name='location'
                                value={inputs.location}
                            // onChange={handleInputChange}
                            // error={inputs.locationError}
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
                                // onRate={handleAestheticRating}
                                icon='star'
                            // error={inputs.aestheticError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Vibes</label>
                            <Rating
                                maxRating={5}
                                defaultRating={inputs.vibes}
                                name='vibes'
                                value={inputs.vibes}
                                // onRate={handleVibesRating}
                                icon='star'
                            // error={inputs.vibesError}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.TextArea
                        name='content'
                        value={inputs.content}
                    // onChange={handleInputChange}
                    // error={inputs.contentError}
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