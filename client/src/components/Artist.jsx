import React, { Component } from 'react';
import axios from 'axios'
import MerchandiseList from './MerchandiseList.jsx'
import ShowList from './ShowList.jsx';
import { Redirect } from 'react-router-dom'

export default class Artist extends Component {
    state = {
        error: '',
        artist: {},
        shows: [],
        merchandise: [],
        redirectToHome: false
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

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
        <div>
            <h2>{this.state.artist.name}</h2>
            <p>{this.state.artist.location}</p>
            <img src={this.state.artist.photo_url} alt={this.state.artist.name} width="450" />
            <p>{this.state.artist.bio}</p>
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
