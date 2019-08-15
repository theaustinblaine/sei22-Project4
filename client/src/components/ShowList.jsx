import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios'

export default class ShowList extends Component {
    state = {
        error: '',
        showsList: [],
    }

    componentDidMount() {
        this.fetchShows()
    }

    fetchShows = async () => {
        try {
            const res = await axios.get(`/api/v1/shows/`)
            this.setState({
                showsList: res.data,
                // artist: this.props.artist
            })
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
            <h3>Shows:</h3>
            <div>
            {this.state.showsList.map(show => (
                <Link to={`/shows/${show.id}`}>
                    <img src={show.flyer_url} alt="" width="150" height="200" />
                </Link>
            ))}
            </div>
            <Link to={{
                pathname: `/artist/${this.props.artist.id}/shows/new`,
                // artist: {
                //     id: this.props.artist.id
                // }
            }}>Add a New Show Listing</Link>
            <p>{this.props.artist.id}</p>
        </div>
        );
    }
}
