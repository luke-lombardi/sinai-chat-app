const PORT = 8080;
const HOST = 'localhost';
const ENDPOINT = 'ws';
const URI = `ws://${HOST}:${PORT}/${ENDPOINT}`;

export interface Message {
  email: string;
  message: string;
  timestamp: number;
}

interface Params {
  receiveCallback: any;
  sendCallback: any;
}

export default class ChatService {
  // @ts-ignore
  private ws: WebSocket;
  private connected: boolean;
  private params: Params;

  constructor(params: Params)  {
    this.connected = false;
    this.params = params;

    this.connect();
  }

  private async connect() {
    this.ws = new WebSocket(URI);
    let self = this;
    
    // Register websocket event handlers
    this.ws.onopen = function(event) {
      self.connected = true;
    };

    this.ws.onmessage = function(event) {
      self.handleMessage(event);
    };
  
  }

  private async handleMessage(event: any) {
    this.params.receiveCallback(event);
  }

  public async sendMessage(email: string, msg: string) {
    if(!this.connected) {
      console.log('Not connected to server.');
      return;
    }

    let message: Message = {
      'email': email,
      'message': msg,
      'timestamp': 0,
    };

    this.ws.send(JSON.stringify(message));
  }
}