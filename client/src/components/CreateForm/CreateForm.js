import React from "react";
import { Container, Form, Rating, Message, Divider, Icon } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

import './CreateForm.css'

// Custom hooks
import { useCreateForm } from '../CustomHooks';

const CreateForm = React.memo(props => {

    const { inputs, errors, handleVibesRating, handleAestheticRating, handleFlavorRating, handleInputChange, handleFileSelected, handleSubmit } = useCreateForm();

    // Category options
    const options = [
        { key: 'f', text: 'Food', value: 'food' }
    ]

    // Gets postID when form is submitted
    if (inputs.postID !== '') {
        console.log('new postID is ' + inputs.postID)
        return <Redirect to={'/post/' + inputs.postID} />
    }

    return (
        <React.Fragment>
            <Container>
                <Divider hidden />
                <Form
                    onSubmit={(event) => handleSubmit(event)}
                    error={errors.formError || errors.charLimitError}
                >
                    <Form.Field
                        error={errors.titleError}
                    >
                        <label>Title</label>
                        <Form.Input
                            name='title'
                            value={inputs.title}
                            onChange={handleInputChange}
                        />
                    </Form.Field>
                    <Form.Field
                        error={errors.descError}
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
                            error={errors.locationError}
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
                    <Form.Group
                        widths="equal"
                    >
                        <Form.Field
                            error={errors.aestheticError}
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
                            error={errors.vibesError}
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
                        <Form.Field
                            error={errors.flavorError}
                        >
                            <label>Flavor</label>
                            <Rating
                                maxRating={5}
                                defaultRating={inputs.flavor}
                                name='vibes'
                                value={inputs.flavor}
                                onRate={handleFlavorRating}
                                icon='star'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field
                        error={errors.contentError}
                    >
                        <Form.TextArea
                            label='Experience'
                            name='content'
                            value={inputs.content}
                            onChange={handleInputChange}
                            placeholder='How was your meal?'
                        />
                    </Form.Field>
                    <Divider hidden />
                    <Form.Field
                        error={errors.photoError}
                    >
                        <label htmlFor='file-upload' className='custom-file-upload'>
                            <Icon name='upload' />{inputs.photoName}
                        </label>
                        <input type='file' name='file' id='file-upload' onChange={handleFileSelected} />
                    </Form.Field>
                    {errors.formError
                        ?
                        <Message
                            error
                            header="Incomplete Submission"
                            content="Please fill out the required fields."
                        />
                        :
                        null
                    }
                    {errors.charLimitError
                        ?
                        <Message
                            error
                            header="Maximum Characters Limit"
                            content="Description must be 200 characters or less."
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
        </React.Fragment >
    );
})

export default CreateForm;