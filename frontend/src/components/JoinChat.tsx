import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI components
import { Button, Paper, Box, Container, Typography, CssBaseline } from '@material-ui/core';
import { FormControl, InputLabel, Input, FormHelperText, TextField } from '@material-ui/core';

interface IProps {
  onEmailSubmit?: any;
};

interface IState {
};

class JoinChat extends Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props);
    this.state =  {
    };
  }

  render() {
    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div>
          <br />
        <Typography component='h1' variant='h5'>
          Join chat
        </Typography>
        <form noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <Button
            onClick={() => { this.props.onEmailSubmit('some shit');  } }
            fullWidth
            variant='contained'
            color='primary'
            // className={classes.submit}
          >
            Join chat
          </Button>

        </form>
      </div>
    </Container>
    );
  }
}

// @ts-ignore
const mapStateToProps = state => {
  return {
  };
};

// @ts-ignore
const mapDispatchToProps = dispatch => {
  return {
    onEmailSubmit: (email: string) => dispatch({ type: 'EMAIL_CHANGED', value: email }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JoinChat);
