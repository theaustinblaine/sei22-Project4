import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';

export default class ShowDetail extends Component {
    state = {
        error: '',
        show: {},
        redirectToShows: false
    }

    componentDidMount() {
        this.fetchShow()
        window.scrollTo(0, 0)
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
            <img src={this.state.show.flyer_url} alt={this.state.show.lineup} height="450" className="detail-photo" />
            <hr />
            <h4>Who? {this.state.show.lineup}</h4>
            <p>When? {this.state.show.date}</p>
            <p>Where? {this.state.show.venue}</p>
            <p>How Much? {this.state.show.cost}</p>
            <Button color="secondary" onClick={this.handleDeleteShow}>Delete This Show Listing</Button>
        </div>
        );
    }
}
