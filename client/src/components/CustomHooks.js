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
        flavor: 0,
        photoUpload: null,
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
        flavorError: false,
        photoError: false,
        formError: false,
        charLimitError: false,
        fileTypeError: false
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

    const handleFlavorRating = (event, { rating }) => {
        setInputs(inputs => ({ ...inputs, flavor: rating }))
    }

    const handleFileSelected = e => {
        let photo = e.target.files[0]
        console.log(photo)
        setInputs(inputs => ({ ...inputs, photoName: photo.name, photoUpload: photo }))
    }

    const handleSubmit = (event) => {

        // Prevent page refresh
        event.preventDefault();

        // Check form submission for errors
        let inputError = false;
        let descCharLimitError = false;
        let fileTypeError = false;

        if (inputs.title === '') {
            setErrors(errors => ({ ...errors, titleError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, titleError: false }))
        }
        if (inputs.description === '' || inputs.description.length > 200) {
            setErrors(errors => ({ ...errors, descError: true }))
            if (inputs.description === '') {
                inputError = true;
            }
            if (inputs.description.length > 200) {
                descCharLimitError = true
            }
        } else {
            setErrors(errors => ({ ...errors, descError: false }))
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
        if (inputs.flavor === 0) {
            setErrors(errors => ({ ...errors, flavorError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, flavorError: false }))
        }
        if (inputs.content === '') {
            setErrors(errors => ({ ...errors, contentError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, contentError: false }))
        }
        // Set photo form field error if no file, or wrong file type
        if (!(inputs.photoUpload instanceof File) || ((inputs.photoUpload instanceof File) && (inputs.photoUpload.type !== 'image/jpeg' && inputs.photoUpload.type !== 'image/png' && inputs.photoUpload.type !== 'image/svg+xml'))) {
            setErrors(errors => ({ ...errors, photoError: true }))
            // If no file present
            if (!(inputs.photoUpload instanceof File)) {
                inputError = true;
            } else if (inputs.photoUpload.type !== 'image/jpeg' && inputs.photoUpload.type !== 'image/png' && inputs.photoUpload.type !== 'image/svg+xml') {
                // If wrong file type
                fileTypeError = true;
            }
        } else {
            setErrors(errors => ({ ...errors, photoError: false }))
        }

        // Prevent form submission if inputs are invalid
        if (inputError) {
            setErrors(errors => ({ ...errors, formError: true }))
        } else {
            setErrors(errors => ({ ...errors, formError: false }))
        }
        if (descCharLimitError) {
            setErrors(errors => ({ ...errors, charLimitError: true }))
        } else {
            setErrors(errors => ({ ...errors, charLimitError: false }))
        }
        if (fileTypeError) {
            setErrors(errors => ({ ...errors, fileTypeError: true }))
        } else {
            setErrors(errors => ({ ...errors, fileTypeError: false }))
        }

        if (inputError || descCharLimitError || fileTypeError) {
            return
        }

        // Prevent form submission if inputs are invalid
        // if (inputError && descCharLimitError) {
        //     setErrors(errors => ({ ...errors, formError: true }))
        //     setErrors(errors => ({ ...errors, charLimitError: true }))
        //     return
        // } else if (inputError && !descCharLimitError) {
        //     setErrors(errors => ({ ...errors, formError: true }))
        //     setErrors(errors => ({ ...errors, charLimitError: false }))
        //     return
        // } else if (!inputError && descCharLimitError) {
        //     setErrors(errors => ({ ...errors, formError: false }))
        //     setErrors(errors => ({ ...errors, charLimitError: true }))
        //     return
        // }

        // If no errors...

        // Handle file upload
        // console.log('Selected file:')
        // console.log(inputs.photoUpload)
        // const formData = new FormData();
        // formData.append('file', inputs.photoUpload, inputs.photoName);

        // // New Image: Make POST request to server
        // axios.post(
        //     '/api/images/upload',
        //     formData,
        //     {
        //         headers: { 'content-type': 'multipart/form-data' }
        //     }
        // ).then(res => {
        //     console.log('File uploaded')
        //     console.log(res)

        //     const newPost = {
        //         title: inputs.title,
        //         description: inputs.description,
        //         content: inputs.content,
        //         category: inputs.category,
        //         location: inputs.location,
        //         aesthetic: inputs.aesthetic,
        //         vibes: inputs.vibes,
        //         flavor: inputs.flavor,
        //         fileName: res.data.file.filename,
        //         fileID: res.data.file.id
        //     }

        //     // New post: Make POST request to server
        //     return axios.post('/api/posts/new', newPost)
        //         .then(res => {
        //             console.log('submit create form: axios post request')
        //             console.log(res)
        //             if (res.status === 200) {
        //                 console.log('axios post success')
        //                 setInputs(inputs => ({ ...inputs, postID: res.data.newPostID }))
        //             }
        //             else {
        //                 console.log('Error: create post')
        //             }
        //         });
        // }).catch(e => {
        //     console.log('error')
        //     console.log(e)
        // })

        // Refresh state
        setErrors({
            titleError: false,
            descError: false,
            contentError: false,
            categoryError: false,
            locationError: false,
            aestheticError: false,
            vibesError: false,
            flavorError: false,
            photoError: false,
            formError: false,
            charLimitError: false,
            fileTypeError: false
        })
    }

    return {
        handleInputChange,
        handleAestheticRating,
        handleVibesRating,
        handleFlavorRating,
        handleFileSelected,
        handleSubmit,
        errors,
        inputs
    };
}

const useUpdateForm = (callback) => {

    const [inputs, setInputs] = useState({
        postID: callback.id,
        title: callback.title,
        description: callback.description,
        content: callback.content,
        category: callback.category,
        location: callback.location,
        aesthetic: callback.aesthetic,
        vibes: callback.vibes,
        flavor: callback.flavor,
        initFileName: callback.fileName,
        initFileID: callback.fileID,
        photoName: callback.fileName,
        photoUpload: null,
        photoChanged: false
    });

    const [errors, setErrors] = useState({
        titleError: false,
        descError: false,
        contentError: false,
        categoryError: false,
        locationError: false,
        aestheticError: false,
        vibesError: false,
        flavorError: false,
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

    const handleFlavorRating = (event, { rating }) => {
        setInputs(inputs => ({ ...inputs, flavor: rating }))
    }

    const handleFileSelected = e => {
        let photo = e.target.files[0]
        console.log(photo)
        setInputs(inputs => ({ ...inputs, photoName: photo.name, photoUpload: photo, photoChanged: true }))
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
        if (inputs.flavor === 0) {
            setErrors(errors => ({ ...errors, flavorError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, flavorError: false }))
        }
        if (inputs.content === '') {
            setErrors(errors => ({ ...errors, contentError: true }))
            inputError = true;
        } else {
            setErrors(errors => ({ ...errors, contentError: false }))
        }
        // If photo was uploaded but there is no file, then error
        if (inputs.photoChanged && !(inputs.photoUpload instanceof File)) {
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

        // GOOD: left untouched (in update: stay the same.)
        // GOOD: change file. (in update: update file)

        // If photo is being updated
        if (inputs.photoChanged) {
            // Handle file upload
            console.log('Selected file:')
            console.log(inputs.photoUpload)
            const formData = new FormData();
            formData.append('file', inputs.photoUpload, inputs.photoName);

            // Make image DELETE request
            axios.post(
                `/api/images/${inputs.initFileID}`
            ).then(res => {
                console.log('Image deleted')
                console.log(res)
                return res
            }).catch(e => {
                console.log('error')
                console.log(e)
            })

            // Make image POST request
            axios.post(
                '/api/images/upload',
                formData,
                {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            ).then(res => {
                console.log('New image uploaded')
                console.log(res)
                updatePost(res.data.file)
            }).catch(e => {
                console.log('error')
                console.log(e)
            })

            // Update post with new image
            const updatePost = (newImage) => {

                //New post object
                const updatedPost = {
                    title: inputs.title,
                    description: inputs.description,
                    content: inputs.content,
                    category: inputs.category,
                    location: inputs.location,
                    aesthetic: inputs.aesthetic,
                    vibes: inputs.vibes,
                    flavor: inputs.flavor,
                    fileName: newImage.filename,
                    fileID: newImage.id
                }

                //Update post: make PUT request to server
                axios.put('/api/posts/' + inputs.postID, updatedPost)
                    .then(res => {
                        console.log(res.data)
                        if (res.status === 200) {
                            console.log('axios edit success')
                            setErrors(errors => ({ ...errors, formSubmitted: true }))
                        } else {
                            console.log('Error: update post')
                        }
                    }).catch(e => {
                        console.log('error')
                        console.log(e)
                    });
            }
        } else {
            // Update post but image is staying the same

            //New post object
            const updatedPost = {
                title: inputs.title,
                description: inputs.description,
                content: inputs.content,
                category: inputs.category,
                location: inputs.location,
                aesthetic: inputs.aesthetic,
                vibes: inputs.vibes,
                flavor: inputs.flavor,
                fileName: inputs.initFileName,
                fileID: inputs.initFileID
            }

            //Update post: make PUT request to server
            axios.put('/api/posts/' + inputs.postID, updatedPost)
                .then(res => {
                    console.log(res.data)
                    if (res.status === 200) {
                        console.log('axios edit success')
                        setErrors(errors => ({ ...errors, formSubmitted: true }))
                    } else {
                        console.log('Error: update post')
                    }
                }).catch(e => {
                    console.log('error')
                    console.log(e)
                });
        }

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
        handleFlavorRating,
        handleFileSelected
    };
}

export { useCreateForm, useUpdateForm };