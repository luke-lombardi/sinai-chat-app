import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI components
import { Button, Container, Typography, CssBaseline, TextField } from '@material-ui/core';

// Styles
import '../styles/JoinChat.css';

interface IProps {
  onEmailSubmit?: any;
};

interface IState {
  email: string;
};

class JoinChat extends Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props);
    this.state =  {
      email: ''
    };

    this.setEmail = this.setEmail.bind(this);
    this.submitEmail = this.submitEmail.bind(this);
  }

  async setEmail(event: any) {
    await this.setState({email: event.target.value});
  }

  async submitEmail() {
    if(this.state.email === '') {
      return;
    }
  
    this.props.onEmailSubmit(this.state.email);
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
            value={this.state.email}
            onChange={ (event) => { this.setEmail(event); }}
            onKeyPress={ (event) => {
              if (event.key === 'Enter') {
                this.submitEmail();
              }
            }}
          />
          <Button
            onClick={ () => { this.submitEmail();  } }
            fullWidth
            variant='contained'
            color='primary'
            className='button_emailSubmit'
          >
            Join chat
          </Button>
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
