import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class ArtistList extends Component {
    state ={
        error: '',
        artists: []
    }

    componentDidMount() {
        this.fetchArtists()
    }

    fetchArtists = async () => {
        try {
            const res = await axios.get('/api/v1/artists/');
            this.setState({artists: res.data});
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
            <h2>All Artists</h2>
            {this.state.artists.map(artist => (
                <div key={artist.id}>
                    <Link to={`/artist/${artist.id}`} >
                        <h3>{artist.name}</h3>
                        <img src={artist.photo_url} alt={artist.name} width="400" />
                    </Link>
                </div>
            ))}
        </div>
        );
    }
}
