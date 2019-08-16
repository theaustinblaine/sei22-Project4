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

        const artistShows = this.state.showsList.filter(show => show.artist === this.props.artist.id)

        return (
        <div>
            <h3>Shows:</h3>
            <div>
            {artistShows.map(show => (
                    <Link to={`/artist/:id/shows/${show.id}`}>
                    <img src={show.flyer_url} alt="" width="150" height="200" />
                    <p>{show.date}</p>
                    </Link>
            ))}
            </div>
            <Link to={`/artist/${this.props.artist.id}/shows/new`}>
                Add a New Show Listing
            </Link>
        </div>
        );
    }
}
