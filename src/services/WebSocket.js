import WebSocket from 'isomorphic-ws';

const WS_URL = process.env.WEBSOCKET_URL || "";

class WebSocketService {
  
  constructor(){
    this.websocket = null;
  }

  initSocket: any = () => {
    this.websocket = new WebSocket(WS_URL);
  }

  onConnOpen : any = () => {
    console.log('Websocket connected!');
  }

  sendMessage : any = (message: string) => {
    this.websocket.send({
      rcaction: "test",
      rcmsg: message
    });
  }

}

export default WebSocketService;