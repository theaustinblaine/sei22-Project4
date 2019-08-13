import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Artist extends Component {
    state = {
        error: '',
        artist: {},
    }

    componentDidMount() {
        this.fetchArtist()
    }

    fetchArtist = async () => {
        try {
            const res = await axios.get(`/api/v1/artists/${this.props.match.params.id}/`)
            this.setState({artist: res.data})
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render() {
        return (
        <div>
            <h2>{this.state.artist.name}</h2>
            <p>{this.state.artist.location}</p>
            <img src={this.state.artist.photo_url} alt={this.state.artist.name} width="450" />
            <p>{this.state.artist.bio}</p>
        </div>
        );
    }
}
