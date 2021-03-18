import React from "react";
import axios from 'axios';
import { Button, Modal, List } from "semantic-ui-react";

const DeleteModal = (props) => {

    // Initiate state to open and close modal
    const [open, setOpen] = React.useState(false)

    // Define variables from props
    let id = props.id;

    // Handle Delete
    const deleteHandler = (e, id) => {

        // prevent refresh when button clicked
        e.preventDefault();

        axios.delete('/api/posts/' + id)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    console.log('Post successfully deleted')
                    // close modal
                    setOpen(false);
                    // refresh list
                    props.getPosts();
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
                trigger={
                    // <Button floated='right' circular icon='delete' />
                    <List.Icon color='grey' name='delete' size='big' verticalAlign='middle' />
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