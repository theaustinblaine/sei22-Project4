import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ArtistList from "./components/ArtistList.jsx";
import Artist from "./components/Artist.jsx";
import MerchandiseDetail from "./components/MerchandiseDetail.jsx";
import ShowDetail from "./components/ShowDetail.jsx";
import ShowForm from "./components/ShowForm.jsx"
import MerchandiseForm from "./components/MerchandiseForm.jsx";
import ArtistForm from "./components/ArtistForm.jsx";
import Header from "./components/Header.jsx"
import "./App.css";

// container component imports
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    
                    <React.Fragment>
                        <CssBaseline />
                        <Container fixed>
                            <Switch>
                                <Route exact path="/" component={ArtistList}/>
                                <Route path="/artist/new" component={ArtistForm} />
                                <Route path="/artist/:id/edit" component={ArtistForm} />
                                <Route path="/artist/:id/shows/new" component={ShowForm} />
                                <Route path="/artist/:id/shows/:id" component={ShowDetail} />
                                <Route path="/artist/:id/merchandise/new" component={MerchandiseForm} />
                                <Route path="/artist/:id/merchandise/:id" component={MerchandiseDetail} />
                                <Route path="/artist/:id" component={Artist}/>
                            </Switch>
                            <Typography component="div" />
                        </Container>
                    </React.Fragment>
                </div>
            </Router>
        );
    }
}

export default App;