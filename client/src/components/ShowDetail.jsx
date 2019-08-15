import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

export default class ShowDetail extends Component {
    state = {
        error: '',
        show: {},
        redirectToShows: false
    }

    componentDidMount() {
        this.fetchShow()
}

    fetchShow = async () => {
        try {
            const res = await Axios.get(`/api/v1/shows/${this.props.match.params.id}/`)
            this.setState({show: res.data})
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    handleDeleteShow = () => {
        Axios.delete(`/api/v1/shows/${this.props.match.params.id}/`, this.state.show)
        .then(() => {
            this.setState({
                redirectToShows: true
            })
        })
    }

    render() {
        if(this.state.redirectToShows) {
            return <Redirect to="/" />
        }
        return (
        <div>
            <img src={this.state.show.flyer_url} alt={this.state.show.lineup} width="450"/>
            <h4>Who? {this.state.show.lineup}</h4>
            <p>When? {this.state.show.date}</p>
            <p>Where? {this.state.show.venue}</p>
            <p>How Much? {this.state.show.cost}</p>
            <button onClick={this.handleDeleteShow}>Delete This Show Listing</button>
        </div>
        );
    }
}
