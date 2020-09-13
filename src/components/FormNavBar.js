import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

function FormNavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className="AppBar_backgroundColor">
        <Toolbar>
            <Typography className={classes.title} variant="h4" noWrap style={{ padding: '1.2%' }}>
                <i className="fas fa-bookmark searchAppBar_icon"></i>
                BookList
            </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default FormNavBar;