import React, { Component } from 'react';
import axios from 'axios'
import MerchandiseList from './MerchandiseList.jsx'
import ShowList from './ShowList.jsx';
import { Redirect} from 'react-router-dom'

export default class Artist extends Component {
    state = {
        error: '',
        artist: {},
        shows: [],
        merchandise: [],
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    componentDidMount() {
        this.fetchArtist(this.props.match.params.id)
    }

    fetchArtist = async () => {
        try {
            const res = await axios.get(`/api/v1/artists/${this.props.match.params.id}/`)
            this.setState({
                artist: res.data,
                shows: res.data.shows,
                merchandise: res.data.merchandise
            })
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    handleDeleteArtist = () => {
        axios.delete(`/api/v1/artists/${this.props.match.params.id}/`, this.state.artist)
        .then(() => {
            this.setState({
                redirectToHome: true
            })
        })
    }

    handleToggleEditForm = () => {
        this.setState({
            isEditFormDisplayed: true
        })
    }

    handleChange = (evt) => {
        let copiedArtist = {...this.state.artist}

        copiedArtist[evt.target.name] = evt.target.value
        this.setState({
            artist: copiedArtist
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.put(`/api/v1/artists/${this.state.artist.id}/`, this.state.artist)
            .then(() => {
                this.setState({
                    isEditFormDisplayed: false
                })
            })
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
        this.state.isEditFormDisplayed
        ?<div>
            <h3>Artist Edit Form</h3>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="artist-name">Artist Name:</label>
                    <input 
                        id="artist-name"
                        type="text"
                        name="name"
                        onChange={this.handleChange}
                        value={this.state.artist.name}
                    />
                </div>
                <div>
                    <label htmlFor="artist-photo">Photo URL:</label>
                    <input 
                        id="artist-photo"
                        type="text"
                        name="photo_url"
                        onChange={this.handleChange}
                        value={this.state.artist.photo_url}
                    />
                </div>
                <div>
                    <label htmlFor="artist-location">Location:</label>
                    <input 
                        id="artist-location"
                        type="text"
                        name="location"
                        onChange={this.handleChange}
                        value={this.state.artist.location}
                    />
                </div>
                <div>
                    <label htmlFor="artist-genre">Genre:</label>
                    <input 
                        id="artist-genre"
                        type="text" 
                        name="genre" 
                        onChange={this.handleChange}
                        value={this.state.artist.genre}
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
                        {this.state.artist.bio}
                    </textarea>
                </div>
                <input type="submit" value="Update This Artist Listing"/>
            </form>
        </div>
        :<div>
            <h2>{this.state.artist.name}</h2>
            <p>{this.state.artist.location}</p>
            <img src={this.state.artist.photo_url} alt={this.state.artist.name} width="450" />
            <p>{this.state.artist.bio}</p>
            {/* <Link to={`/artist/${this.state.artist.id}/edit`}>Edit this Artist Listing</Link> */}
            <button onClick={this.handleToggleEditForm}>Edit This Artist Listing</button>
            <button onClick={this.handleDeleteArtist}>Delete this Artist Listing</button>
            <MerchandiseList 
                artist={this.state.artist}
            />
            <ShowList 
                artist={this.state.artist}
            />
        </div>

        );
    }
}
