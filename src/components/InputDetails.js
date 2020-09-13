import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function FloatingActionButtons() {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Fab size="medium" aria-label="add" style={{ margin: '0' }}>
          <AddIcon />
        </Fab>
      </div>
    );
}


function InputDetails(props) {
    // to determine size of form and whether it should be one line or two lines
    const [ InputArea, setInputArea ] = useState({
      firstLine: 'Add book...',
      secondLine: ''
    });

    // to determine input values for book title and author
    const [ values, setValues ] = useState({
      title: '',
      author: ''
    });

    // check if an input field is typed - if not, and outside of form is clicked, form should minimize
    window.addEventListener('click', (event) => {
      if (event.target.placeholder === 'Book title' || event.target.placeholder === 'Author') return;
      setInputArea({
        firstLine: 'Add book...',
        secondLine: ''
      });
    })

    function expandInputArea() {
      setInputArea({
        firstLine: 'Book title',
        secondLine: 'Author'
      });
    }

    function handleChange(event) {
      const { name, value } = event.target;
      setValues(previousValue => {
        return {
          ...previousValue,
          [ name ]: value
        }
      });
    }

    function submitBook() {
      props.onAdd(values);
      setValues({
        title: '',
        author: ''
      });
    }

    return (
        <div>
            <form className="addBook_form">
                <input
                  name="title"
                  value={values.title}
                  placeholder={InputArea.firstLine}
                  onChange={handleChange}
                  onClick={expandInputArea}
                />
                <input
                  name="author"
                  value={values.author}
                  placeholder={InputArea.secondLine}
                  onChange={handleChange}
                  style={InputArea.secondLine ? { display: null } : { display: 'none' }}
                />
                <div className="addBookButton_style" onClick={submitBook}
                     style={InputArea.secondLine ? { display: null } : { display: 'none' }} >
                  <FloatingActionButtons />
                </div>
            </form>
        </div>
    );
}

export default InputDetails;