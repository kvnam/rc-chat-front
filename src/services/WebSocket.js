import WebSocket from 'isomorphic-ws';

const WS_URL = process.env.REACT_APP_WEBSOCKET_URL || "";

let WSService = null;

const MESSAGE_TYPE = {
  ALL: 'all',
  PM: 'pm'
};
class WebSocketService {

  constructor() {
    console.log(`WebSocket service contructor called`);
    this.websocket = null;
    this.messageListeners = [];
    this.isOpen = false;
    this.userSent = false;
    this.userMsg = null;
  }

  /**
   *  Set up WebSocket connection for a new user and
   *  basic listeners to handle events
   */
  initSocket = () => {
    console.log(`WebSocket service initSocket called`);
    this.websocket = new WebSocket(WS_URL);
    this.websocket.open = this.onConnOpen;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onclose = this.onConnClose;
  }

  /**
   *  Show connection status to user
   */
  onConnOpen = () => {
    this.isOpen = true;
    console.log('Websocket connected!');
    if(this.timeOut){
      clearTimeout(this.timeOut);
    }
    if(!this.userSent){
      console.log('Sending user add message now');
      this.sendMessage(this.userMsg.routeKey, this.userMsg.message);
      this.userSent = true;
    }
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
    console.log(this.websocket);
    if(this.websocket && this.isOpen){
      this.websocket.send(JSON.stringify({
        rcaction: routeKey,
        rcmsg: JSON.stringify(message)
      }));
    }else{
      console.log('Storing user msg for on open');
      this.userMsg = {
        routeKey,
        message
      };
      console.log(`Websocket connection not found!!`);
    }    
  }

  /**
   *  Used by application to register different listeners for 
   *  different message types [To be used later]
   *  @param room Room name
   *  @param type Message type ['all', 'pm']
   *  @param listener Function to handle message type
   */
  addMessageListener = (room, type, listener) => {
    console.log(`Adding listener for ${room} for ${type} msgs`);
    if (!type || !room || typeof listener !== 'function') {
      return;
    }
    this.messageListeners.push({
      room,
      type,
      listener
    });
  }

  /**
   * Handler that receives the actual messages from the WebSocket API
   * For now it simply returns the parsed message body
   * @param data Message body received from WebSocket 
   */
  onMessage = (data) => {
    console.log('Response from API ');
    console.log(data);
    if (data) {
      const message = JSON.parse(data);
      const typeListener = this.messageListeners.find(listener => (listener.type === message.type) && (message.room === listener.room));
      if (typeListener && typeof typeListener.listener === "function") {
        console.log(`Calling listener for message `);
        typeListener.listener(message);
      } else {
        console.log('No handler found for message type');
      }
    }
  }

  static initWSService() {
    console.log(`WebSocket service initWSService called`);
    if (!WSService) {
      console.log(`WSService is null make a new one`);
      WSService = new WebSocketService();
      WSService.initSocket();
      return WSService;
    }
    console.log('WSService already exists return it');
    return WSService;
  }

}

export const getWSService = WebSocketService.initWSService;