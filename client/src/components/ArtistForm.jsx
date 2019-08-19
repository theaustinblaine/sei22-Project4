import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

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
                <label htmlFor="artist-name">Artist Name:</label>
                <input 
                    id="artist-name"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.newArtist.name}
                />
            </div>
            <div>
                <label htmlFor="artist-photo">Photo URL:</label>
                <input 
                    id="artist-photo"
                    type="text"
                    name="photo_url"
                    onChange={this.handleChange}
                    value={this.state.newArtist.photo_url}
                />
            </div>
            <div>
                <label htmlFor="artist-location">Location:</label>
                <input 
                    id="artist-location"
                    type="text"
                    name="location"
                    onChange={this.handleChange}
                    value={this.state.newArtist.location}
                />
            </div>
            <div>
                <label htmlFor="artist-genre">Genre:</label>
                <input 
                    id="artist-genre"
                    type="text" 
                    name="genre" 
                    onChange={this.handleChange}
                    value={this.state.newArtist.genre}
                />
            </div>
            <div>
                <label htmlFor="artist-bio">Bio:</label>
                <textarea 
                    name="bio" 
                    id="artist-bio" 
                    cols="30" 
                    rows="10"
                    onChange={this.handleChange}
                >
                    {this.state.newArtist.bio}
                </textarea>
            </div>
            <input type="submit" value="Create New Artist Listing"/>
        </form>
        );
    }
}
