// Test component / app entry point
import React, { Component } from 'react';
import { connect } from "react-redux";

// UI Components
import { Container } from '@material-ui/core';
import JoinChat from './components/JoinChat';
import ChatWindow from './components/ChatWindow';

interface IProps {
  email: string;
};

interface IState {
};

class App extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
    };


  }

  render() {
    return (
      <Container component='main' maxWidth='md' style={ { alignItems: 'center'} }>
        {
          // If email was never set, render the JoinChat component
          this.props.email !== '' ?
            <JoinChat />
          :
          // Otherwise, render the chat window
            <ChatWindow />
        }
      </Container>
    );
  }

}

// @ts-ignore
const mapStateToProps = state => {
  return {
    email: state.email
  };
};

// @ts-ignore
const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
