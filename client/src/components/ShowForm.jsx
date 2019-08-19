import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Axios from 'axios';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


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
            <h2>Add a New Show</h2> 
            <div>
                <TextField
                    id="show-lineup"
                    label="Lineup"
                    className=""
                    name="lineup"
                    onChange={this.handleChange}
                    value={this.state.newShow.lineup}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="show-flyer-url"
                    label="Flyer image"
                    className=""
                    name="flyer_url"
                    onChange={this.handleChange}
                    value={this.state.newShow.flyer_url}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="show-date"
                    label="Date"
                    className=""
                    name="date"
                    onChange={this.handleChange}
                    value={this.state.newShow.date}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    id="standard-name"
                    label="Venue"
                    className=""
                    name="venue"
                    onChange={this.handleChange}
                    value={this.state.newShow.venue}
                    margin="normal"
                />
            </div>
            <div>
                <FormControl width="300" className="">
                <InputLabel htmlFor="show-cost">Cost</InputLabel>
                <Input
                id="show-cost"
                name="cost"
                onChange={this.handleChange}
                value={this.state.newShow.cost}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                </FormControl>
            </div>
            <input type="submit" value="Add New Show Listing"/>
        </form>
        );
    }
}
