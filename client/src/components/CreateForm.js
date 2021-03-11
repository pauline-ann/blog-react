import React, { useState } from "react";
import { Container, Form, Rating, Message, Divider, Button, Input, Segment } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
// import { InputFile } from 'semantic-ui-react-input-file'

// Custom hooks
import { useCreateForm } from './CustomHooks';

const CreateForm = React.memo(props => {

    const { errors, inputs, handleVibesRating, handleAestheticRating, handleInputChange, handleFileUpload, handleSubmit } = useCreateForm();

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
                    error={errors.formError}
                >
                    <Form.Field>
                        <label>Title</label>
                        <Form.Input
                            name='title'
                            value={inputs.title}
                            onChange={handleInputChange}
                            error={errors.titleError}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Description</label>
                        <Form.Input
                            name='description'
                            value={inputs.description}
                            onChange={handleInputChange}
                            error={errors.descError}
                        />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Location</label>
                            <Form.Input
                                name='location'
                                value={inputs.location}
                                onChange={handleInputChange}
                                error={errors.locationError}
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
                    </Form.Group>
                    <Form.TextArea
                        label='Experience'
                        name='content'
                        value={inputs.content}
                        onChange={handleInputChange}
                        placeholder='How was your meal?'
                        error={errors.contentError}
                    />
                    <Form.Group widths='equal'>
                        <Form.Field
                            error={errors.photoError}
                        >
                            <label>{inputs.photoName}</label>
                            {/* <input type='file' className='custom-file-input' id='customFile' /> */}
                            {/* <InputFile
                                button={{ ...buttonProps }}
                                input={{
                                    id: 'input-control-id',
                                    onChange: handleUpload
                                }}
                            /> */}
                            {/* <InputFile
                                input={{
                                    id: 'input-control-id',
                                    onChange: handleFileUpload,
                                    name:'photo',
                                    accept: '.png, .jpg, .jpeg'
                                }}
                            /> */}
                        </Form.Field>
                        <Form.Field>
                             
                        </Form.Field>
                    </Form.Group>
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