import WebSocket from 'isomorphic-ws';

const WS_URL = process.env.WEBSOCKET_URL || "";

class WebSocketService {
  
  constructor(){
    this.websocket = null;
  }

  initSocket = () => {
    this.websocket = new WebSocket(WS_URL);
    this.websocket.open = this.onConnOpen;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onclose = this.onConnClose;
  }

  onConnOpen = () => {
    console.log('Websocket connected!');
  }

  onConnClose = () => {
    console.log('Websocket closed!');
  }

  sendMessage = (message) => {
    this.websocket.send({
      rcaction: "test",
      rcmsg: message
    });
  }

  onMessage = (data) => {
    console.log('Response from API ');
    console.log(data);
  }

}

export default WebSocketService;