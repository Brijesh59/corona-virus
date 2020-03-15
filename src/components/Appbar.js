import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dashboard from '@material-ui/icons/Dashboard';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {formatDateTime} from '../utils/functions'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  mobile1:{
    [theme.breakpoints.down('xs')]: {
     display: 'none'
    },
  },
  mobile2:{
    [theme.breakpoints.up('sm')]: {
     display: 'none'
    },
  }
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Dashboard />
          <Typography variant="h6" className={classes.title}>
            &nbsp; Coronavirus Stats
          </Typography>
          
          <Typography className={classes.mobile1}>
            <span style={{fontStyle:'italic'}}>As per - </span> {formatDateTime(props.statsDate)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}