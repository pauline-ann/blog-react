import { useState } from 'react';
import axios from 'axios';

const useCreateForm = (callback) => {

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
        formError: false,
        postID: ''
    });

    // Event handlers

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const handleAestheticRating = (event, { rating }) => {
        setInputs(inputs => ({ ...inputs, aesthetic: rating }))
    }

    const handleVibesRating = (event, { rating }) => {
        setInputs(inputs => ({ ...inputs, vibes: rating }))
    }

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

        // Prevent form submission if inputs are invalid
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
            .then(res => {
                console.log('submit create form: axios post request')
                console.log(res)
                if (res.status === 200) {
                    console.log('axios post success')
                    setInputs(inputs => ({ ...inputs, postID: res.data.newPostID }))
                }
                else {
                    console.log('Error: create post')
                }
            });

        // Refresh state
        setInputs(inputs => ({
            ...inputs,
            formError: false
        }))
    }

    return {
        handleSubmit,
        handleInputChange,
        handleAestheticRating,
        handleVibesRating,
        inputs
    };
}

const useUpdateForm = (callback) => {

    const [inputs, setInputs] = useState({
        title: callback.title,
        description: callback.description,
        content: callback.content,
        category: callback.category,
        location: callback.location,
        aesthetic: callback.aesthetic,
        vibes: callback.vibes,
        titleError: false,
        descError: false,
        contentError: false,
        categoryError: false,
        locationError: false,
        aestheticError: false,
        vibesError: false,
        formError: false,
        formSubmitted: false,
        postID: callback.id
    });

    // Event handlers

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    const handleAestheticRating = (event, { rating }) => {
        setInputs(inputs => ({ ...inputs, aesthetic: rating }))
    }

    const handleVibesRating = (event, { rating }) => {
        setInputs(inputs => ({ ...inputs, vibes: rating }))
    }

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

        // Prevent form submission if inputs are invalid
        if (error) {
            setInputs(inputs => ({ ...inputs, formError: true }))
            return
        }

        // If no errors, make POST request to server
        const updatedPost = {
            title: inputs.title,
            description: inputs.description,
            content: inputs.content,
            category: inputs.category,
            location: inputs.location,
            aesthetic: inputs.aesthetic,
            vibes: inputs.vibes
        }

        axios.put('/api/posts/' + inputs.postID, updatedPost)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    console.log('axios edit success')
                    setInputs(inputs => ({ ...inputs, formSubmitted: true }))
                } else {
                    console.log('Error: update post')
                }
            });

        // Refresh state
        setInputs(inputs => ({ ...inputs, formError: false }))
    }

    return {
        inputs,
        handleInputChange,
        handleSubmit,
        handleAestheticRating,
        handleVibesRating
    };
}

const useFeaturedForm = (callback) => {

    const [inputs, setInputs] = useState({
        featureID_main: '',
        featureID_sub: '',
        featureID_sub2: '',
        mainFeatureError: false,
        subFeatureError: false,
        subSubFeatureError: false,
        formError: false
    });

    // Event handlers

    const handleMainFeature = (event, { value }) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, featureID_main: value }
        ))
    }

    const handleSubFeature = (event, { value }) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, featureID_sub: value }))
    }

    const handleSubSubFeature = (event, { value }) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, featureID_sub2: value }))

    }

    const handleSubmit = (event) => {

        // Prevent page refresh
        event.preventDefault();

        // Check form submission for errors
        let error = false;
        if (inputs.featureID_main === '') {
            setInputs(inputs => ({ ...inputs, mainFeatureError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, mainFeatureError: false }))
        }
        if (inputs.featureID_sub === '') {
            setInputs(inputs => ({ ...inputs, subFeatureError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, subFeatureError: false }))
        }
        if (inputs.featureID_sub2 === '') {
            setInputs(inputs => ({ ...inputs, subSubFeatureError: true }))
            error = true;
        } else {
            setInputs(inputs => ({ ...inputs, subSubFeatureError: false }))
        }

        // Prevent form submission if inputs are invalid
        if (error) {
            setInputs(inputs => ({ ...inputs, formError: true }))
            return
        }

        // If no errors, make POST request to server
        // const newPost = {
        //     title: inputs.title,
        //     description: inputs.description,
        //     content: inputs.content,
        //     category: inputs.category,
        //     location: inputs.location,
        //     aesthetic: inputs.aesthetic,
        //     vibes: inputs.vibes
        // }

        // axios.post('/api/posts/new', newPost)
        //     .then(res => {
        //         console.log('submit create form: axios post request')
        //         console.log(res)
        //         if (res.status === 200) {
        //             console.log('axios post success')
        //             setInputs(inputs => ({ ...inputs, postID: res.data.newPostID }))
        //         }
        //         else {
        //             console.log('Error: create post')
        //         }
        //     });

        // Refresh state
        setInputs(inputs => ({
            ...inputs,
            formError: false
        }))
    }

    return {
        handleMainFeature,
        handleSubFeature,
        handleSubSubFeature,
        handleSubmit,
        inputs
    };
}

export { useCreateForm, useUpdateForm, useFeaturedForm };