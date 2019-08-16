import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class MerchandiseList extends Component {
    state = {
        error: '',
        merchandiseList: []
    }

    componentDidMount() {
        this.fetchAllMerchandise()
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
            <div>
                {artistMerchandise.map(merch => (
                    <Link to={`/artist/${this.props.artist.id}/merchandise/${merch.id}`}>
                        <img src={merch.photo_url} alt={merch.name} width="150" height="" />
                    </Link>
                ))}
            </div>
            <Link to={`/artist/${this.props.artist.id}/merchandise/new`}>Add a New Piece of Merchandise</Link>
        </div>
        );
    }
}
