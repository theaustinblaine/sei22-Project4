import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

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
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Typography variant="h6" color="inherit">
                    <h4>iPK</h4>
            {/* <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                HOME
            </Link> */}
                </Typography>
            </IconButton>
            <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
                HOME
            </Link>
            </Toolbar>
        </AppBar>
        </div>
        );
    }

