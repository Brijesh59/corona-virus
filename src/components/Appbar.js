import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Dashboard from '@material-ui/icons/Dashboard';

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
          
          <Typography>
            <span style={{fontStyle:'italic'}}>As per - </span> {formatDateTime(props.statsDate)}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}