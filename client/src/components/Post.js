import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment';
import PostInfo from './PostInfo.js'

const Post = (props) => {

    const [post, setPost] = useState({
        title: '',
        description: '',
        content: '',
        category: '',
        location: '',
        rating: {
            aesthetic: 0,
            vibes: 0,
            flavor: 0
        },
        photo: {
            fileName: '',
            fileID: ''
        },
        date: null,
        dataIsLoaded: false
    });

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts/' + props.match.params.id)
                .then((res) => {
                    // handle success
                    console.log(res);
                    setPost({
                        title: res.data.title,
                        description: res.data.description,
                        content: res.data.content,
                        category: res.data.category,
                        location: res.data.location,
                        rating: {
                            aesthetic: res.data.rating.aesthetic,
                            vibes: res.data.rating.vibes,
                            flavor: res.data.rating.flavor
                        },
                        photo: {
                            fileName: res.data.photo.fileName,
                            fileID: res.data.photo.fileID
                        },
                        date: moment(res.data.createdAt).format('dddd, MMMM Do YYYY'),
                        dataIsLoaded: true
                    });
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [props.match.params.id])

    return (
        post.dataIsLoaded && <PostInfo
            title={post.title}
            description={post.description}
            content={post.content}
            category={post.category}
            location={post.location}
            aesthetic={post.rating.aesthetic}
            vibes={post.rating.vibes}
            flavor={post.rating.flavor}
            fileName={post.photo.fileName}
            date={post.date}
        />
    );
}

export default Post;