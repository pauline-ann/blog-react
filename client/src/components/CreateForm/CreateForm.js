import React from "react";
import { Container, Form, Rating, Message, Divider, Icon } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import ReactQuill from 'react-quill';

import './CreateForm.css'

// Custom hooks
import { useCreateForm } from '../CustomHooks';

const CreateForm = React.memo(props => {

    const { inputs, errors, handleInputChange, handleVibesRating, handleAestheticRating, handleFlavorRating, handleContentChange, handleCategoryChange, handleFileSelected, handleSubmit } = useCreateForm();

    // Category options
    const options = [
        { key: 'bc', text: 'Bakery Cafe', value: 'Bakery Cafe' },
        { key: 'b', text: 'Bar', value: 'Bar' },
        { key: 'ba', text: 'Barbeque', value: 'Barbeque' },
        { key: 'bu', text: 'Buffet', value: 'Buffet' },
        { key: 'c', text: 'Cafe', value: 'Cafe' },
        { key: 'ca', text: 'Cajun', value: 'Cajun' },
        { key: 'cd', text: 'Casual Dining', value: 'Casual Dining' },
        { key: 'ch', text: 'Coffeehouse', value: 'Coffeehouse' },
        { key: 'd', text: 'Dessert', value: 'Dessert' },
        { key: 'di', text: 'Diner', value: 'Diner' },
        { key: 'dr', text: 'Drive-in', value: 'Drive-in' },
        { key: 'e', text: 'Ethnic', value: 'Ethnic' },
        { key: 'fs', text: 'Family Style', value: 'Family Style' },
        { key: 'ff', text: 'Fast Food', value: 'Fast Food' },
        { key: 'fd', text: 'Fine Dining', value: 'Fine Dining' },
        { key: 'fh', text: 'Food Hall', value: 'Food Hall' },
        { key: 'g', text: 'Gastropub', value: 'Gastropub' },
        { key: 'h', text: 'Halal', value: 'Halal' },
        { key: 'ha', text: 'Hamburger', value: 'Hamburger' },
        { key: 'ho', text: 'Hotdog', value: 'Hotdog' },
        { key: 'jb', text: 'Juice Bar', value: 'Juice Bar' },
        { key: 'n', text: 'Noodles', value: 'Noodles' },
        { key: 'p', text: 'Pizzeria', value: 'Pizzeria' },
        { key: 's', text: 'Sandwich', value: 'Sandwich' },
        { key: 'se', text: 'Seafood', value: 'Seafood' },
        { key: 'st', text: 'Steakhouse', value: 'Steakhouse' },
        { key: 'tc', text: 'Tabletop Cooking', value: 'Tabletop Cooking' },
        { key: 'v', text: 'Vegan', value: 'Vegan' },
        { key: 'vt', text: 'Vegetarian', value: 'Vegetarian' }
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
                    onSubmit={(event) => handleSubmit(event, props.onLoad)}
                    // onSubmit={(event) => handleFormSubmit(event)}
                    error={errors.formError || errors.charLimitError || errors.fileTypeError}
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
                        <Form.Field
                            error={errors.categoryError}
                        >
                            <label>Category</label>
                            <Form.Select
                                fluid
                                options={options}
                                name='category'
                                search
                                placeholder='Category'
                                onChange={handleCategoryChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Divider hidden />
                    <Form.Group
                        inline
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
                    <Divider hidden />
                    <Form.Field
                        error={errors.contentError}
                    >
                        <label>Experience</label>
                        <ReactQuill
                            value={inputs.content}
                            onChange={handleContentChange}
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
                    {errors.fileTypeError
                        ?
                        <Message
                            error
                            header="File Type Error"
                            content="Image must be .jpeg, .png, or .svg"
                        />
                        :
                        null
                    }
                    <Divider section hidden />
                    <Container textAlign='center'>
                        <Form.Button
                            color="brown"
                            type='submit'
                            size='large'
                        >Submit</Form.Button>
                    </Container>
                </Form>
            </Container>
        </React.Fragment >
    );
})

export default CreateForm;