import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function DenseAppBar() {
    const classes = useStyles();

        return (
        
        <div className={classes.root}>
        <AppBar position="fixed" className="nav">
            <Toolbar variant="dense" className="navbar">
            <Typography variant="h4" color="inherit" className="nav-logo">
                <h4 className="nav-logo">iPK</h4>
            </Typography>
            <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                HOME
            </Link>
            </Toolbar>
        </AppBar>
        </div>
        );
    }

