import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

import Axios from 'axios';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';

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
            <h2>{this.state.merchandise.name}</h2>
            <hr />
            <br />
            <img src={this.state.merchandise.photo_url} alt={this.state.merchandise.name} width="450" className="detail-photo" />
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Typography component="div" />
                    <p>{this.state.merchandise.description}</p>
                </Container>
            </React.Fragment>
            <Button color="secondary" onClick={this.handleDeleteMerchandise}>Delete This Merch Listing</Button>
        </div>
        );
    }
}
