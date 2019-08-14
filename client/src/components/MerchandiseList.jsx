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
        return (
        <div>
            <h3>Merchandise:</h3>
            {this.state.merchandiseList.map(merch => (
                <Link to={`/api/v1/merchandise/${merch.id}`}>
                    <img src={merch.photo_url} alt={merch.name} width="150" height="" />
                </Link>
            ))}
        </div>
        );
    }
}
