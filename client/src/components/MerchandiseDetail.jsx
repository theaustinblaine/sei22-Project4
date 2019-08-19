import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

export default class MerchandiseDetail extends Component {
    state = {
        error: '',
        merchandise: [],
        redirectToHome: false
    }

    componentDidMount() {
        this.fetchMerchandise()
        window.scrollTo(0, 0)
    }

    fetchMerchandise = async () => {
        try {
            const res = await Axios.get(`/api/v1/merchandise/${this.props.match.params.id}/`)
            this.setState({merchandise: res.data})
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    handleDeleteMerchandise = () => {
        Axios.delete(`/api/v1/merchandise/${this.props.match.params.id}/`, this.state.merchandise)
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
        <div>
            <h3>{this.state.merchandise.name}</h3>
            <img src={this.state.merchandise.photo_url} alt={this.state.merchandise.name} width="450" />
            <p>{this.state.merchandise.description}</p>
            <button onClick={this.handleDeleteMerchandise}>Delete This Merch Listing</button>
        </div>
        );
    }
}
