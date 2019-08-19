import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

import TextField from '@material-ui/core/TextField';

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
                <TextField
                    id="merch-name"
                    label="Name"
                    className=""
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.newMerchandise.name}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="merch-photo_url"
                    label="Image URL"
                    className=""
                    name="photo_url"
                    onChange={this.handleChange}
                    value={this.state.newMerchandise.photo_url}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="merch-description"
                    label="Description"
                    multiline
                    rowsMax="4"
                    name="description"
                    value={this.state.newMerchandise.description}
                    onChange={this.handleChange}
                    className=""
                    margin="normal"
                />
            </div>
            <input type="submit" value="Add New Merchandise Listing"/>
        </form>
        );
    }
}
