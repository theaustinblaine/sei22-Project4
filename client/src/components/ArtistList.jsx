import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class ArtistList extends Component {
    state = {
        error: '',
        artists: []
    }

    componentDidMount() {
        this.fetchArtists()
    }

    fetchArtists = async () => {
        try {
            const res = await axios.get('/api/v1/artists/');
            this.setState({artists: res.data});
        }
        catch (err) {
            console.log(err)
            this.setState({error: err.message})
        }
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
        <div>
            <h2>All Artists</h2>
            <Link to={`/artist/new/`}>
                Add a New Artist Listing
            </Link>
            <div className="artist-list">
                {this.state.artists.map(artist => (
                    <Card className="artist-card" key={artist.id}>
                        <CardActionArea>
                            <Link to={`/artist/${artist.id}`} >
                                <CardMedia
                                    component="img"
                                    alt={artist.name}
                                    image={artist.photo_url}
                                    title={artist.name}
                                />
                                <CardContent className="card-content">
                                    <Typography gutterBottom variant="h6" component="p">
                                        {artist.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {artist.location}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </CardActionArea>
                    </Card>
                ))}
            </div>
        </div>

        );
    }
}
