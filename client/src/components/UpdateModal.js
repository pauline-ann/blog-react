import React from "react";
import { Container, Form, Rating, Message, Modal, List, Divider } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

// redirect when submit

// Custom hooks
import { useUpdateForm } from './CustomHooks';

const UpdateModal = React.memo(props => {

    // Component Styling

    const headerStyle = {
        textAlign: 'center'
    }

    // Initiate Custom Hooks

    const { inputs, errors, handleInputChange, handleVibesRating, handleAestheticRating, handleFileUpload, handleSubmit } = useUpdateForm(props);

    console.log(inputs.photo)

    // Category options
    const options = [
        { key: 'f', text: 'Food', value: 'food' }
    ]

    // Redirect to post page once form is submitted
    if (errors.formSubmitted === true) {
        return <Redirect to={'/post/' + inputs.postID} />
    }

    return (
        <React.Fragment>
            <Modal closeIcon trigger={
                <List.Icon color='grey' name='edit outline' size='big' verticalAlign='middle' />
            }>
                <Modal.Header style={headerStyle}>
                    Edit Post
                </Modal.Header>
                <Modal.Content>
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
                        <Form.Group widths="equal">
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
                        <Form.Field
                            error={errors.contentError}
                        >
                            <Form.TextArea
                                label='Experience'
                                name='content'
                                value={inputs.content}
                                onChange={handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field
                            error={errors.photoError}
                        >
                            <label></label>
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
                                header="Maximum Character Limit"
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
                </Modal.Content>
            </Modal>
        </React.Fragment >
    );
})

export default UpdateModal;