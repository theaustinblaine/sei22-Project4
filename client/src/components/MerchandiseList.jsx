import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';


export default class MerchandiseList extends Component {
    state = {
        error: '',
        merchandiseList: []
    }

    componentDidMount() {
        this.fetchAllMerchandise()
        window.scrollTo(0, 0)
    }

    fetchAllMerchandise = async () => {
        try {
            const res = await axios.get(`/api/v1/merchandise/`)
            this.setState({merchandiseList: res.data})
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

        const artistMerchandise = this.state.merchandiseList.filter(merch => merch.artist === this.props.artist.id)
        
        return (
        <div>
            <h3>Merchandise:</h3>
            <div className="merch-list">
                {artistMerchandise.map(merch => (
                    <Link to={`/artist/${this.props.artist.id}/merchandise/${merch.id}`}>
                    
                    <Card className="merch-card">
                        <CardActionArea>
                        <CardMedia
                            component="img"
                            alt={merch.name}
                            height="140"
                            image={merch.photo_url}
                            title="Contemplative Reptile"
                        />
                        </CardActionArea>
                    </Card>

                    </Link>
                ))}
            </div>
            <Link to={`/artist/${this.props.artist.id}/merchandise/new`}>
                <Button color="#03DAC6" variant="contained" className="create-button">Add a New Piece of Merchandise</Button>
            </Link>
        </div>
        );
    }
}
