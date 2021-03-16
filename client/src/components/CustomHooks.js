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
        photo: null,
        photoName: 'Upload Image',
        postID: ''
    });

    const [errors, setErrors] = useState({
        titleError: false,
        descError: false,
        contentError: false,
        categoryError: false,
        locationError: false,
        aestheticError: false,
        vibesError: false,
        photoError: false,
        formError: false,
        charLimitError: false
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

    const handleFileSelected = e => {
        let photo = e.target.files[0]
        console.log(photo)
        setInputs(inputs => ({ ...inputs, photoName: photo.name, photo: photo }))
    }

    const handleSubmit = (event) => {

        // Prevent page refresh
        event.preventDefault();

        // Check form submission for errors
        let inputError = false;
        let descCharLimitError = false;

        if (inputs.description === '' || inputs.description.length > 200) {
            setErrors(errors => ({ ...errors, descError: true }))
            if (inputs.description === '') {
                inputError = true;
            } else {
                inputError = false;
            }
            if (inputs.description.length > 200) {
                descCharLimitError = true
            } else {
                descCharLimitError = false
            }
        } else {
            setErrors(errors => ({ ...errors, descError: false }))
        }
        if (inputs.title === '') {
            setErrors(errors => ({ ...errors, titleError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, titleError: false }))
        }
        if (inputs.location === '') {
            setErrors(errors => ({ ...errors, locationError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, locationError: false }))
        }
        if (inputs.category === '') {
            setErrors(errors => ({ ...errors, categoryError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, categoryError: false }))
        }
        if (inputs.aesthetic === 0) {
            setErrors(errors => ({ ...errors, aestheticError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, aestheticError: false }))
        }
        if (inputs.vibes === 0) {
            setErrors(errors => ({ ...errors, vibesError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, vibesError: false }))
        }
        if (inputs.content === '') {
            setErrors(errors => ({ ...errors, contentError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, contentError: false }))
        }
        if (!(inputs.photo instanceof File)) {
            setErrors(errors => ({ ...errors, photoError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, photoError: false }))
        }

        // Prevent form submission if inputs are invalid
        if (inputError && descCharLimitError) {
            setErrors(errors => ({ ...errors, formError: true }))
            setErrors(errors => ({ ...errors, charLimitError: true }))
            return
        } else if (inputError && !descCharLimitError) {
            setErrors(errors => ({ ...errors, formError: true }))
            setErrors(errors => ({ ...errors, charLimitError: false }))
            return
        } else if (!inputError && descCharLimitError) {
            setErrors(errors => ({ ...errors, formError: false }))
            setErrors(errors => ({ ...errors, charLimitError: true }))
            return
        }

        // If no errors...

        // Handle file upload
        console.log('Selected file:')
        console.log(inputs.photo)
        const formData = new FormData();
        // console.log(formData)
        formData.append('file', inputs.photo, inputs.photoName);
        // console.log(formData)

        // async function uploadPhoto(formData) {
        //     return
            axios.post(
                'api/images/upload',
                formData,
                {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            ).then(res => {
                console.log('File uploaded')
                console.log(res)
            }).catch(e => {
                console.log('error')
                console.log(e)
            })
        // }

        // async function uploadPost() {
        //     const id = await uploadPhoto(formData)
        // }

        // how to do axios post one after another

        // Make POST request to server (new image)
        // axios.post(
        //     'api/images/upload',
        //     formData,
        //     {
        //         headers: { 'content-type': 'multipart/form-data' }
        //     }
        // ).then(data => {
        //     console.log('File uploaded')
        //     console.log(data)
        // }).catch(e => {
        //     console.log('error')
        //     console.log(e)
        // })

        // Make POST request to server (new post)
        // const newPost = {
        //     title: inputs.title,
        //     description: inputs.description,
        //     content: inputs.content,
        //     category: inputs.category,
        //     location: inputs.location,
        //     aesthetic: inputs.aesthetic,
        //     vibes: inputs.vibes,
        //     photo: photoID
        // }

        // axios.post('/api/posts/new', newPost)
        //     .then(res => {
        //         console.log('submit create form: axios post request')
        //         console.log(res)
        //         if (res.status === 200) {
        //             console.log('axios post success')
        //             setInputs(newPost => ({ ...inputs, postID: res.data.newPostID }))
        //         }
        //         else {
        //             console.log('Error: create post')
        //         }
        //     });

        // Refresh state
        setErrors(errors => ({
            ...errors,
            formError: false
        }))
    }

    return {
        handleInputChange,
        handleAestheticRating,
        handleVibesRating,
        handleFileSelected,
        handleSubmit,
        errors,
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
        photo: callback.photo,
        postID: callback.id
    });

    const [errors, setErrors] = useState({
        titleError: false,
        descError: false,
        contentError: false,
        categoryError: false,
        locationError: false,
        aestheticError: false,
        vibesError: false,
        photoError: false,
        formError: false,
        charLimitError: false,
        formSubmitted: false,
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

    const handleFileUpload = e => {
        let photo = e.target.files[0]
        console.log(photo)
        setInputs(inputs => ({ ...inputs, photoName: photo.name, photo: photo }))
    }

    const handleSubmit = (event) => {

        // Prevent page refresh
        event.preventDefault();

        // Check form submission for errors
        let inputError = false;
        let descCharLimitError = false;

        if (inputs.description === '' || inputs.description.length > 200) {
            setErrors(errors => ({ ...errors, descError: true }))
            if (inputs.description === '') {
                inputError = true;
            } else {
                inputError = false;
            }
            if (inputs.description.length > 200) {
                descCharLimitError = true
            } else {
                descCharLimitError = false
            }
        } else {
            setErrors(errors => ({ ...errors, descError: false }))
        }
        if (inputs.title === '') {
            setErrors(errors => ({ ...errors, titleError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, titleError: false }))
        }
        if (inputs.location === '') {
            setErrors(errors => ({ ...errors, locationError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, locationError: false }))
        }
        if (inputs.category === '') {
            setErrors(errors => ({ ...errors, categoryError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, categoryError: false }))
        }
        if (inputs.aesthetic === 0) {
            setErrors(errors => ({ ...errors, aestheticError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, aestheticError: false }))
        }
        if (inputs.vibes === 0) {
            setErrors(errors => ({ ...errors, vibesError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, vibesError: false }))
        }
        if (inputs.content === '') {
            setErrors(errors => ({ ...errors, contentError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, contentError: false }))
        }
        if (Object.keys(inputs.photo).length === 0) {
            setErrors(errors => ({ ...errors, photoError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, photoError: false }))
        }

        // Prevent form submission if inputs are invalid
        if (inputError && descCharLimitError) {
            setErrors(errors => ({ ...errors, formError: true }))
            setErrors(errors => ({ ...errors, charLimitError: true }))
            return
        } else if (inputError && !descCharLimitError) {
            setErrors(errors => ({ ...errors, formError: true }))
            setErrors(errors => ({ ...errors, charLimitError: false }))
            return
        } else if (!inputError && descCharLimitError) {
            setErrors(errors => ({ ...errors, formError: false }))
            setErrors(errors => ({ ...errors, charLimitError: true }))
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
                    setErrors(errors => ({ ...errors, formSubmitted: true }))
                } else {
                    console.log('Error: update post')
                }
            });

        // Refresh state
        setErrors(errors => ({
            ...errors,
            formError: false
        }))
    }

    return {
        inputs,
        errors,
        handleInputChange,
        handleSubmit,
        handleAestheticRating,
        handleVibesRating,
        handleFileUpload
    };
}

export { useCreateForm, useUpdateForm };