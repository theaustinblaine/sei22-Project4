import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

export default class ShowForm extends Component {
    state = {
        newShow: {
            flyer_url: "",
            date: "",
            venue: "",
            lineup: "",
            cost: "",
            artist: this.props.match.params.id
        },
        redirectToHome: false
    }

    handleChange = (evt) => {
        let copiedShow = {...this.state.newShow}
        
        copiedShow[evt.target.name] = evt.target.value
        this.setState({
            newShow: copiedShow
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        Axios.post('/api/v1/shows/', this.state.newShow)
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
                <label htmlFor="show-lineup">Lineup:</label>
                <input 
                    id="show-lineup"
                    type="text"
                    name="lineup"
                    onChange={this.handleChange}
                    value={this.state.newShow.lineup}
                />
            </div>
            <div>
                <label htmlFor="show-flyer-url">Flyer Image URL:</label>
                <input 
                    id="show-flyer-url"
                    type="text"
                    name="flyer_url"
                    onChange={this.handleChange}
                    value={this.state.newShow.flyer_url}
                />
            </div>
            <div>
                <label htmlFor="show-date">Date:</label>
                <input 
                    id="show-date"
                    type="text"
                    name="date"
                    onChange={this.handleChange}
                    value={this.state.newShow.date}
                />
            </div>
            <div>
                <label htmlFor="show-venue">Venue:</label>
                <input 
                    id="show-venue"
                    type="text"
                    name="venue"
                    onChange={this.handleChange}
                    value={this.state.newShow.venue}
                />
            </div>
            <div>
                <label htmlFor="show-cost">Cost:</label>
                <input 
                    id="show-cost"
                    type="text" 
                    name="cost"
                    onChange={this.handleChange}
                    value={this.state.newShow.cost}
                />
            </div>
            <input type="submit" value="Add New Show Listing"/>
        </form>
        );
    }
}
