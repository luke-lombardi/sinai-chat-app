import React, { Component } from 'react';
import { connect } from 'react-redux';

// UI components
import { Container, Paper, List, ListItem } from '@material-ui/core';
import { ListItemText, TextField, Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

// Styles
import '../styles/ChatWindow.css';

// Services
import ChatService, { Message } from '../services/ChatService';

interface IProps {
  email: string;
  messageCount: number;
  onMessage?: any;
};

interface IState {
  messages: Array<Message>;
  message: string;
};

class ChatWindow extends Component<IProps, IState> {
  private chatService: ChatService;

  constructor(props: IProps) {
    super(props);
    this.state = {
      messages: [],
      message: '',
    };

    this.handleMessage = this.handleMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.chatService = new ChatService( {
      receiveCallback: this.handleMessage,
      sendCallback: undefined
    });
  
  }

  async setMessage(event: any) {
    await this.setState({ message: event.target.value });
  }

  async handleMessage(event: any) {
    let msg: Message = JSON.parse(event.data);
    
    await this.setState({ 
      messages: this.state.messages.concat([ msg ]),
      message: '',
    });

    await this.props.onMessage();
  }

  async sendMessage() {
    if (this.state.message === '') {
      return;
    }

    await this.chatService.sendMessage(this.props.email, this.state.message);
  }
  
  render() {

    return (
      <Container>

        <Typography className='label_messageCount'>
          User: <b> {this.props.email} </b> <br />
          Message Count: <b> {this.props.messageCount} </b>
        </Typography>

        { /* Chat message list */}
        <Paper style={{ maxHeight: 400, minHeight: 400, overflow: 'auto', marginTop: '5%' } }>
          <List >
            {this.state.messages.map(msg => {
                // TODO: distinguish between receiver and sender & format accordingly
                return (
                  <ListItem key={msg.timestamp} style={ { textAlign: 'left' }  }>
                    <ListItemText primary={`${msg.email} - ${msg.message}`} />
                  </ListItem>
                );
              })}
          </List>
        </Paper>

        { /* Chat message input */}
        <Paper className="container_message">
            <TextField
              id="outlined-name"
              label="Enter a message"
              className="input_message"
              value={ this.state.message }
              onChange = { (event) => { this.setMessage(event) } }
              margin="normal"
              variant="outlined"
              onKeyPress={ (event) => {
                if (event.key === 'Enter') {
                  this.sendMessage();
                }
              }}
            />
            <Button 
              variant="contained" color="primary" className="button_messageSubmit" 
              onClick={() => { this.sendMessage(); } }
            >
              Send
            </Button>
        </Paper>

      </Container>
    );
  }
}

// @ts-ignore
const mapStateToProps = state => {
  return {
    email: state.email,
    messageCount: state.messageCount
  };
};

// @ts-ignore
const mapDispatchToProps = dispatch => {
  return {
    onMessage: () => dispatch({ type: 'GOT_MESSAGE', value: 1 }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWindow);
