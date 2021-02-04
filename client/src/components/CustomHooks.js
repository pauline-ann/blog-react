import { useState } from 'react';
import axios from 'axios';

const usePostForm = (callback) => {

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
        formSubmitted: false,
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
                console.log(res.data)
                if (res.status === 200) {
                    console.log('axios post')
                    setInputs(inputs => ({ ...inputs, formSubmitted: true }))
                }
            });

        axios.get('/api/posts')
            .then((res) => {
                console.log('axios get')
                // handle success
                console.log(res);
                const data = res.data;
                let postID = data[data.length - 1]._id;
                console.log('New post ID is ' + postID)
                setInputs(inputs => ({ ...inputs, postID: postID }))
            })
            .catch((err) => {
                // handle error
                console.log(err);
            });

        // Refresh state
        setInputs(inputs => ({ ...inputs, formError: false }))
    }

    return {
        handleSubmit,
        handleInputChange,
        handleAestheticRating,
        handleVibesRating,
        inputs
    };
}

export default usePostForm;