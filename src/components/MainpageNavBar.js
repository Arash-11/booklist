import React from 'react';
import { auth } from '../Firebase';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '60%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '26ch',
      '&:focus': {
        width: '34ch',
      },
    },
  },
}));


function MainpageNavBar(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = auth.currentUser;


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function signOut() {
    auth.signOut().then(function() {
      // Sign-out successful.
      console.log('Sign-out successful.')
    }).catch(function(error) {
      // An error happened.
      console.log("An error occurred when signing out.");
    });
  }

  function deleteAccount() {
    const result = window.confirm('Deleting your account will erase all the data. Do you want to continue?');
    if (result) {
      user.delete().then(function() {
        // User deleted.
        console.log('Account deleted.')
      }).catch(function(error) {
        // An error happened.
        console.log("An error occurred when deleting account.");
      })
    }
    else return window.location.pathname = "/mainpage";
  }

  function handleChange(event) {
    const inputValue = event.target.value;
    const searchWord = new RegExp(inputValue, 'gi');
    props.filterBooks(searchWord);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className="AppBar_backgroundColor">
        <Toolbar>
          <Typography className={classes.title + ' app_title'} variant="h5" noWrap style={{ padding: '1.2%' }}>
            <i className="fas fa-bookmark searchAppBar_icon"></i>
            BookList
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search book or author…"
              onChange={handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className="account_icon">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={signOut}>
                  <Link to="/" style={{ textDecoration: 'none' }}>Log out</Link>
                </MenuItem>
                <MenuItem onClick={deleteAccount}>
                  Delete account
                </MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MainpageNavBar;