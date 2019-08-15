import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import ArtistList from "./components/ArtistList.jsx";
import Artist from "./components/Artist.jsx";
import MerchandiseDetail from "./components/MerchandiseDetail.jsx";
import ShowDetail from "./components/ShowDetail.jsx";
import ShowForm from "./components/ShowForm.jsx"
import MerchandiseForm from "./components/MerchandiseForm.jsx";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">

                    <div>
                        <h1>indiEPK</h1>
                        <div>
                            <div><Link to="/">All Artists</Link></div>
                        </div>
                    </div>

                    <Switch>
                        <Route exact path="/" component={ArtistList}/>
                        <Route path="/artist/:id/shows/new" component={ShowForm} />
                        <Route path="/artist/:id/merchandise/new" component={MerchandiseForm} />
                        <Route path="/artist/:id/merchandise/:id" component={MerchandiseDetail} />
                        <Route path="/artist/:id" component={Artist}/>
                        <Route path="/shows/:id" component={ShowDetail} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;