import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));

function ButtonSizes(props) {
    const classes = useStyles();

    function handleClick() {
        props.onDelete();
    }

    return (
      <div className="trash_icon" onClick={handleClick}>
        <IconButton aria-label="delete" className={classes.margin}>
            <DeleteIcon />
        </IconButton>
      </div>
    );
}


function SwitchLabel() {
    const [state, setState] = useState({ readCheck: false });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };
  
    return (
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={state.readCheck}
              onChange={handleChange}
              name="readCheck"
              className="switch_style"
            />
          }
          label="read"
        />
    );
  }


function BookDetails(props) {
    function handleClick() {
        props.deleteBook(props.id);
    }

    return (
        <div className="bookCard_style">
            <h3>{props.title}</h3>
            <h4>{props.author}</h4>
            <div>
                <SwitchLabel />
                <ButtonSizes onDelete={handleClick} />
            </div>
        </div>
    );
}

export default BookDetails;