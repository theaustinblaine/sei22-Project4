import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';


export default class ShowList extends Component {
    state = {
        error: '',
        showsList: [],
    }

    componentDidMount() {
        this.fetchShows()
        window.scrollTo(0, 0)
    }

    fetchShows = async () => {
        try {
            const res = await axios.get(`/api/v1/shows/`)
            this.setState({showsList: res.data})
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

        const artistShows = this.state.showsList.filter(show => show.artist === this.props.artist.id)

        return (
        <div>
            <h3>Shows:</h3>
            <div className="show-list">
            {artistShows.map(show => (
                    <Link to={`/artist/:id/shows/${show.id}`}>
                        <Card className="show-card">
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={show.date}
                            height="140"
                            image={show.flyer_url}
                            title="Contemplative Reptile"
                        />
                        </CardActionArea>
                    </Card>

                    {/* <img src={show.flyer_url} alt="" width="150" height="200" />
                    <p>{show.date}</p> */}
                    </Link>
            ))}
            </div>
            <Link to={`/artist/${this.props.artist.id}/shows/new`}>
                Add a New Show Listing
            </Link>
        </div>
        );
    }
}
