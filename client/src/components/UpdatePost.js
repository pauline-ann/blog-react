import React from "react";
import { Container, Form, Rating, Message } from "semantic-ui-react";

// handle change in form with custom hook
// redirect when submit

// Custom hooks
import useUpdateForm from './CustomHooks';

const UpdatePost = (props) => {

    // const { inputs, handleVibesRating, handleAestheticRating, handleInputChange, handleSubmit } = useUpdateForm();

    // Category options
    const options = [
        { key: 'f', text: 'Food', value: 'food' }
    ]

    const defaultInputs = {
        title: props.title,
        description: props.description,
        content: props.content,
        category: props.category,
        location: props.location,
        aesthetic: props.aesthetic,
        vibes: props.vibes,
        id: props.id
    }

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
                            value={defaultInputs.title}
                            // onChange={handleInputChange}
                            // error={inputs.titleError}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Form.Input
                            name='description'
                            value={defaultInputs.description}
                            // onChange={handleInputChange}
                            // error={inputs.descError}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Location</label>
                            <Form.Input
                                name='location'
                                value={defaultInputs.location}
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
                                defaultRating={defaultInputs.aesthetic}
                                name='aesthetic'
                                value={defaultInputs.aesthetic}
                                // onRate={handleAestheticRating}
                                icon='star'
                                // error={inputs.aestheticError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Vibes</label>
                            <Rating
                                maxRating={5}
                                defaultRating={defaultInputs.vibes}
                                name='vibes'
                                value={defaultInputs.vibes}
                                // onRate={handleVibesRating}
                                icon='star'
                                // error={inputs.vibesError}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.TextArea
                        name='content'
                        value={defaultInputs.content}
                        // onChange={handleInputChange}
                        // error={inputs.contentError}
                    />
                    {/* {inputs.formError
                        ?
                        <Message
                            error
                            header="Incomplete Submission"
                            content="Please fill out the required fields."
                        />
                        :
                        null
                    } */}
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