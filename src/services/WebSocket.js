import WebSocket from 'isomorphic-ws';

const WS_URL = process.env.WEBSOCKET_URL || "";

class WebSocketService {
  
  constructor(){
    this.websocket = null;
    this.messageListeners = [];
  }

  /**
   *  Set up WebSocket connection for a new user and
   *  basic listeners to handle events
   */
  initSocket = () => {
    this.websocket = new WebSocket(WS_URL);
    this.websocket.open = this.onConnOpen;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onclose = this.onConnClose;
  }

  /**
   *  Show connection status to user
   */
  onConnOpen = () => {
    console.log('Websocket connected!');
  }

  /**
   *  Log lost connection for now
   */
  onConnClose = () => {
    console.log('Websocket closed!');
  }

  /**
   *  Used my application to send message to the WebSocket API Gateway
   *  @param message String message
   */
  sendMessage = (message) => {
    this.websocket.send({
      rcaction: "test",
      rcmsg: message
    });
  }

  /**
   *  Used by application to register different listeners for 
   *  different message types
   *  @param type Message type ['all', 'pm']
   *  @param listener Function to handle message type
   */
  addMessageListener = (type, listener) => {
    if(!type || typeof listener !== 'function'){
      return;
    }
    this.messageListeners.push({
      type,
      listener
    });
  }

  /**
   * Handler that receives the actual messages from the WebSocket API
   * @param data Message body received from WebSocket 
   */
  onMessage = (data) => {
    console.log('Response from API ');
    console.log(data);

  }

}

export default WebSocketService;