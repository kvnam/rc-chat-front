import WebSocket from 'isomorphic-ws';

const WS_URL = process.env.REACT_APP_WEBSOCKET_URL || "";

let WSService = null;

const MESSAGE_TYPE = {
  ALL: 'all',
  PM: 'pm'
};
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
    this.websocket.open = this.onConnOpen();
    this.websocket.onmessage = this.onMessage();
    this.websocket.onclose = this.onConnClose();
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
   *  Used by application to send message to the WebSocket API Gateway
   *  @param routeKey The route key for WebSocket API Gateway
   *  @param message String message
   *  message {
   *    room,
   *    type,
   *    msg,
   *    username,
   *    for
   *  }
   */
  sendMessage = (routeKey, message) => {
    console.log(`Sending message to route ${routeKey}`);
    console.log(message);

    this.websocket.send({
      rcaction: routeKey,
      rcmsg: JSON.stringify(message)
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
    const message = JSON.parse(data);
    const typeListener = this.messageListeners.find(listener => listener.type === message.type);
    if(typeListener && typeof typeListener.listener === "function"){
      typeListener.listener(message);
    }else{
      console.log('No handler found for message type');
    }
  }

  static initWSService(){
    if(!WSService){
      WSService = new WebSocketService();
      WSService.initSocket();
      return WSService;
    }
    return WSService;
  }

}

export const getWSService = WebSocketService.initWSService;