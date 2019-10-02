import React, { Component } from 'react';
import axios from 'axios'
import MerchandiseList from './MerchandiseList.jsx'
import ShowList from './ShowList.jsx';
import { Redirect} from 'react-router-dom'

// import container component
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';



export default class Artist extends Component {
    state = {
        error: '',
        artist: {},
        shows: [],
        merchandise: [],
        redirectToHome: false,
        isEditFormDisplayed: false
    }

    componentDidMount() {
        this.fetchArtist(this.props.match.params.id)
        window.scrollTo(0, 0)
    }

    fetchArtist = async () => {
        try {
            const res = await axios.get(`/api/v1/artists/${this.props.match.params.id}/`)
            this.setState({
                artist: res.data,
                shows: res.data.shows,
                merchandise: res.data.merchandise
            })
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    handleDeleteArtist = () => {
        axios.delete(`/api/v1/artists/${this.props.match.params.id}/`, this.state.artist)
        .then(() => {
            this.setState({
                redirectToHome: true
            })
        })
    }

    handleToggleEditForm = () => {
        this.setState({
            isEditFormDisplayed: true
        })
    }

    handleChange = (evt) => {
        let copiedArtist = {...this.state.artist}

        copiedArtist[evt.target.name] = evt.target.value
        this.setState({
            artist: copiedArtist
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()

        axios.put(`/api/v1/artists/${this.state.artist.id}/`, this.state.artist)
            .then(() => {
                this.setState({
                    isEditFormDisplayed: false
                })
            })
    }

    render() {
        
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        if(this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            this.state.isEditFormDisplayed
        ?
            <div>
            <h3>Artist Edit Form</h3>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField
                    id="artist-name"
                    label="Name"
                    className=""
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.artist.name}
                    margin="normal"
                    />
                </div>
                <div>
                    <TextField
                    id="artist-photo"
                    label="Photo URL"
                    className=""
                    name="photo_url"
                    onChange={this.handleChange}
                    value={this.state.artist.photo_url}
                    margin="normal"
                />
                </div>
                <div>
                    <TextField
                    id="artist-location"
                    label="Location"
                    className=""
                    name="location"
                    onChange={this.handleChange}
                    value={this.state.artist.location}
                    margin="normal"
                />
                </div>
                <div>
                    <TextField
                    id="artist-genre"
                    label="Genre(s)"
                    className=""
                    name="genre"
                    onChange={this.handleChange}
                    value={this.state.artist.genre}
                    margin="normal"
                />
                </div>
                <div>
                    <TextField
                    id="artist-bio"
                    label="Bio"
                    multiline
                    rowsMax="6"
                    name="bio"
                    value={this.state.artist.bio}
                    onChange={this.handleChange}
                    className=""
                    margin="normal"
                />
                </div>
                <input type="submit" value="Update This Artist Listing"/>
            </form>
        </div>
        :<div>
            <h2>{this.state.artist.name}</h2>
            <hr />
            <p>{this.state.artist.location}</p>
            <img src={this.state.artist.photo_url} alt={this.state.artist.name} width="450"  className="detail-photo" />
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Typography component="div" />
                    <p>{this.state.artist.bio}</p>
                </Container>
            </React.Fragment>


            <hr />
            <Button onClick={this.handleToggleEditForm}>Edit This Artist Listing</Button>
            <Button color="secondary" onClick={this.handleDeleteArtist}>Delete this Artist Listing</Button>
            <hr />
            
            <Grid container className="" spacing={2}>
                <Grid item xs={12}>
                    <Grid container justify="space-around" spacing={2}>
                        <Grid item>
                            <MerchandiseList 
                                artist={this.state.artist}
                            />
                        </Grid>
                        <Grid item>
                        <ShowList 
                            artist={this.state.artist}
                        />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
        );
    }
}