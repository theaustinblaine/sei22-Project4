import React, { Component } from 'react';
import Axios from 'axios';

export default class MerchandiseDetail extends Component {
    state = {
        error: '',
        merchandise: []
    }

    componentDidMount() {
        this.fetchMerchandise()
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

    render() {
        return (
        <div>
            <h3>{this.state.merchandise.name}</h3>
            <img src={this.state.merchandise.photo_url} alt={this.state.merchandise.name} width="450" />
            <p>{this.state.merchandise.description}</p>
        </div>
        );
    }
}
