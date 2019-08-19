import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'


// Card component imports
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default class ArtistList extends Component {
    state = {
        error: '',
        artists: []
    }

    componentDidMount() {
        this.fetchArtists()
        window.scrollTo(0, 0)
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
            <h1>indiEPK</h1>
            <hr/>
            <p>indiEPK is a resource for artists and fans to keep up with and discover artists around the world without having to fight through the flood of social media.
                Historically, press kits have been a tool for an artist to showcase anything relevent that they may be working on or have recently done.
                With the rise in internet popularity, the music business turned to electronic press kits, or EPK's. Now with the rise of social media, EPK's have fallen to the wayside.
                While social media is a great tool for artist to fan interaction, we've lost the plot in a sense, which is artists doing what artists do: create.
                <br/>
                <br/>
                At indiEPK, we want to find that missing link and offer up a way for artists to present themselves in a clean and effective manner without the fuzz of social currency.
                Whether you're a listener just looking to see which artists in your city you should be keeping an eye on, or you're another artist planning a tour and looking for networking opportunities.
                We want to provide the most simple platform for music business without the hassle of the music business.
                <br/>
                <br/>
                Click on an artist below to see what we're all about!
            </p>


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
