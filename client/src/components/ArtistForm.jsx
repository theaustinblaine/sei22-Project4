import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

import TextField from '@material-ui/core/TextField';

export default class ArtistForm extends Component {
    state = {
        newArtist: {
            name: "",
            photo_url: "",
            location: "",
            genre: "",
            bio: ""
        },
        redirectToHome: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleChange = (evt) => {
        let copiedArtist = {...this.state.newArtist}

        copiedArtist[evt.target.name] = evt.target.value
        this.setState({
            newArtist: copiedArtist
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        Axios.post('/api/v1/artists/', this.state.newArtist)
            .then(() => {
                this.setState({
                    redirectToHome: true
                })
            })
    }

    render() {
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
        <form onSubmit={this.handleSubmit}>
            <div>
                <TextField
                    id="artist-name"
                    label="Name"
                    className=""
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.newArtist.name}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="artist-photo"
                    label="Photo URL"
                    className=""
                    name="photo_url"
                    onChange={this.handleChange}
                    value={this.state.newArtist.photo_url}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="artist-location"
                    label="Location"
                    className=""
                    name="location"
                    onChange={this.handleChange}
                    value={this.state.newArtist.location}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="artist-genre"
                    label="Genre(s)"
                    className=""
                    name="genre"
                    onChange={this.handleChange}
                    value={this.state.newArtist.genre}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="artist-bio"
                    label="Bio"
                    multiline
                    rowsMax="6"
                    name="bio"
                    value={this.state.newArtist.bio}
                    onChange={this.handleChange}
                    className=""
                    margin="normal"
                />
            </div>
            <input type="submit" value="Create New Artist Listing"/>
        </form>
        );
    }
}
