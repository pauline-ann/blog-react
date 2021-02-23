import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Modal } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

const DeleteModal = (props) => {

    // Initiate state to open and close modal
    const [open, setOpen] = React.useState(false)

    let id = props.id;

    // Handle Delete
    const deleteHandler = (e, id) => {

        e.preventDefault();

        axios.delete('/api/posts/' + id)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    console.log('Post successfully deleted')
                    // getAPI()
                    // somehow tell parent component that it's been deleted,
                    // then have parent component refresh list
                    setOpen(false)
                } else {
                    console.log('Error: delete post')
                    setOpen(false)
                }
            })
    }

    return (
        <React.Fragment>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='tiny'
                trigger={<Button floated='right' circular icon='delete' />
                }>
                <Modal.Header>Delete Post</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this post?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group basic size='small'>
                        <Button positive onClick={(e) => { deleteHandler(e, id) }}>
                Yes
            </Button>
                        <Button negative onClick={() => setOpen(false)}>
                            No
                            </Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>
        </React.Fragment >
    );
}

export default DeleteModal;