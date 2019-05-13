import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Typography,
  Button
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from '@material-ui/core/TextField';
import Message from "../components/Room/Chat/Message";
import { getUserService } from "../services/Users";
import { getWSService } from "../services/WebSocket";

import "./chatroom.scss";
interface User {
  username: string;
  room: string;
}

interface Message {
  type: string;
  msg: string;
  sent: Date | string;
  user: User;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    roomContainer: {
      width: "100%",
      margin: "auto",
      padding: "1.5rem",
      border: "1px solid #dadfe1",
      backgroundColor: "#f2f1ef",
      color: "#2e3131",
      minHeight: '100vh'
    },
    chatWindow: {
      width: "100%",
      border: "1px solid #dadfe1",
      backgroundColor: "#fff",
      padding: "1.5rem 1rem",
      height: "70vh",
      overflowY: "scroll",
      overflowX: "hidden",
      [theme.breakpoints.down("xs")]: {
        height: "60vh"
      }
    },
    members: {
      marginLeft: "1rem",
      border: "1px solid #dadfe1",
      height: "70vh",
      padding: "1rem",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0",
        height: "auto"
      }
    },
    greeting: {
      marginTop: "2rem"
    },
    userName: {
      color: "#3498db",
      fontSize: "1.2rem",
      fontWeight: 500
    },
    inline: {
      display: "inline"
    },
    sendChatBox: {
      backgroundColor: "#FFF",
      marginTop: ".5rem",
      border: "1px solid #dadfe1",
      fontSize: "1rem",
      padding: ".7rem"
    },
    sendBtn: {
      height: '94px',
      marginTop: '.6rem'      
    }
  });

export interface Props extends WithStyles<typeof styles> {
  user: User;
}

function ChatRoom(props: Props) {
  const { classes } = props;
  const [users, setUsers] = useState<User[]>(
    getUserService().getUserList(props.user.room)
  );
  const [messageList, updateMessageList] = useState<Message[]>([]);
  const [fields, setFields] = useState({
    userService: getUserService(),
    userAdded: false
  });

  const [currentMessage, setCurrentMessage] = useState<Message>({
    type: "",
    msg: "",
    user: {
      username: "",
      room: ""
    },
    sent: ""
  });

  const chatMessageHandler = (message: Message) => {
    console.log('Add msg to list');
    if (message.type === "all") {
      console.log(message);
      let updatedList = [...messageList];
      updatedList.push(message);
      updateMessageList(updatedList);
    }
  };

  const onInputChange = (event: React.FormEvent<EventTarget>) => {
    let eventTarget = event.target as HTMLInputElement;
    let updatedMsg = { ...currentMessage };
    updatedMsg.msg = eventTarget.value;
    setCurrentMessage(updatedMsg);
  }

  const onSendMessage = () => {
    console.log('Send message clicked ');
    let updatedMsg = { ...currentMessage };
    updatedMsg.type = "all";
    updatedMsg.sent = new Date();
    updatedMsg.user = {
      username: props.user.username,
      room: props.user.room
    };
    setCurrentMessage(updatedMsg);
    getWSService().sendMessage("test", updatedMsg);
  }

  useEffect(() => {
    console.log(`In userService useEffect`);
    if(!fields.userAdded && !users.find(usrVal => usrVal.username === props.user.username)){
      console.log(`Adding user to service `);
      const userAdd = fields.userService.addUser({
        username: props.user.username,
        room: props.user.room
      });
      console.log(`User added ${userAdd}`);
      setFields({...fields, userAdded: userAdd});
    }
  }, [fields.userService]);

  useEffect(() => {
    if (
      fields.userAdded &&
      users &&
      !users.find(usrVal => usrVal.username === props.user.username)
    ) {
      const userList = [...users];
      userList.push(props.user);
      setUsers(userList);
      //Add message listener for this chat room
      getWSService().addMessageListener(
        props.user.room,
        "all",
        chatMessageHandler
      );
      //Add user details to current message

    }
  }, [fields.userAdded]);

  if(fields.userAdded){
  return (
    <Grid
      container
      alignItems="flex-start"
      justify="flex-start"
      className={classes.roomContainer}
    >
      <Grid item xs={12} md={8}>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-start"
          direction="column"
        >
          <Grid item xs={12} md={12} className={classes.root}>
            <div className={classes.chatWindow}>
              <Typography className={classes.greeting} variant="h5">
                Welcome to room {props.user.room}!
              </Typography>
              {messageList.map((message, index) => (
                <Message key={index} message={message} />
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={12} className={classes.root}>
            <Grid container direction="row" alignItems="flex-start">
              <Grid item xs={9} md={11}>
                <div className={classes.sendChatBox}>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Enter your message here"
                    multiline
                    rowsMax="4"
                    fullWidth
                    value={currentMessage.msg}
                    onChange={(event) => onInputChange(event)}
                    className="msg-box"
                    margin="normal"
                  />
                </div>
              </Grid>
              <Grid item xs={3} md={1}>
                <div>
                  <Button onClick={onSendMessage} className={classes.sendBtn} variant="contained" type="button" color="secondary">Send</Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={classes.members}>
          <Typography className={classes.greeting} variant="h5">
            Members
          </Typography>
          <List>
            {users.map(user => {
              return (
                <ListItem key={user.username} className="user-name">
                  <ListItemText primary={user.username} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </Grid>
    </Grid>
  );
 }

  return <div className="loading">Adding you to the room, please wait..</div>;
}

export default withStyles(styles)(ChatRoom);
