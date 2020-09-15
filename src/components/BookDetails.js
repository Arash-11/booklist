import React, { useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


function SwitchLabel(props) {
    const [ state, setState ] = useState({ readCheck: false });

    const handleClick = () => {
      props.onDelete();
    }
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <FormControlLabel className="switch_style"
          control={
            <Switch
              size="small"
              checked={state.readCheck}
              onClick={handleClick}
              onChange={handleChange}
              name="readCheck"
              className="toggle_style"
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

    function handleChangeStatus() {
      props.changeStatus(props.readStatus, props.id);
    }

    return (
        <div className="bookCard_style">
            <h3>{props.title}</h3>
            <h4>{props.author}</h4>
            <SwitchLabel onDelete={handleClick} handleChangeStatus={handleChangeStatus} />
        </div>
    );
}

export default BookDetails;