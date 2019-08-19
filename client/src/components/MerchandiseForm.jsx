import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

export default class MerchandiseForm extends Component {
    state = {
        newMerchandise: {
            artist: this.props.match.params.id,
            name: "",
            photo_url: "",
            description: ""
        },
        redirectToHome: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleChange = (evt) => {
        let copiedMerchandise = {...this.state.newMerchandise}

        copiedMerchandise[evt.target.name] = evt.target.value
        this.setState({
            newMerchandise: copiedMerchandise
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        Axios.post('/api/v1/merchandise/', this.state.newMerchandise)
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
        <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="merch-name">Merchandise Name:</label>
                <input 
                    id="merch-name"
                    type="text"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.newMerchandise.name}
                />
            </div>
            <div>
                <label htmlFor="merch-photo_url">Photo URL:</label>
                <input 
                    id="merch-photo_url"
                    type="text"
                    name="photo_url"
                    onChange={this.handleChange}
                    value={this.state.newMerchandise.photo_url}
                />
            </div>
            <div>
                <label htmlFor="merch-description">Description</label>
                <textarea 
                    name="description" 
                    id="merch-description"
                    onChange={this.handleChange} 
                    cols="30" 
                    rows="10"
                >
                    {this.state.newMerchandise.description}
                </textarea>
            </div>
            <input type="submit" value="Add New Merchandise Listing"/>
        </form>
        );
    }
}
