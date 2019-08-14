import React, { Component } from 'react';
import axios from 'axios'
import MerchandiseList from './MerchandiseList.jsx'
import ShowList from './ShowList.jsx';

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
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
        <div>
            <h2>{this.state.artist.name}</h2>
            <p>{this.state.artist.location}</p>
            <img src={this.state.artist.photo_url} alt={this.state.artist.name} width="450" />
            <p>{this.state.artist.bio}</p>
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
