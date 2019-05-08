import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Message from '../components/Room/Chat/Message';
import { getUserService } from '../services/Users';
import { getWSService } from '../services/WebSocket';

import './chatroom.scss';
interface User {
  username: string,
  room: string
};

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%'
  },
  roomContainer: {
    width: '100%',
    margin: 'auto',
    padding: '1.5rem',
    border: '1px solid #dadfe1',
    backgroundColor: '#f2f1ef',
    color: '#2e3131'
  },
  chatWindow: {
    width: '100%',
    border: '1px solid #dadfe1',
    backgroundColor: '#fff',
    padding: '1.5rem 1rem',
    height: '70vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    [theme.breakpoints.down("xs")]:{
      height: '60vh'
    }
  },
  members: {
    marginLeft: '1rem',
    border: '1px solid #dadfe1',
    height: '70vh',
    padding: '1rem',
    [theme.breakpoints.down("xs")]:{
      marginLeft: '0',
      height: 'auto'
    }
  },
  greeting: {
    marginTop: '2rem',
  },
  userName: {
    color: '#3498db',
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  inline: {
    display: 'inline'
  }
});

export interface Props extends WithStyles<typeof styles> {
  user: User   
 }

function ChatRoom(props: Props){
  const { classes } = props;
  const [users, setUsers] = useState<User[]>(getUserService().getUserList(props.user.room));
  const [ fields, setFields ] = useState({
    messageList: [{
      text: '',
      username: ''
    }],
    messageFromWS: getWSService().chatMsgHandler(),
    userService: getUserService(),
    userAdded: getUserService().addUser({username: props.user.username, room: props.user.room}),
  });

  useEffect(() => {
    if(fields.userAdded && users && !users.find(usrVal => usrVal.username === props.user.username)){
      const userList = [...users];
      userList.push(props.user);
      setUsers(userList);
    }
  }, [fields.userAdded]);

  useEffect(() => {

  }, [fields.messageFromWS])

 // if(fields.userAdded){
    return (
      <Grid container alignItems="flex-start" justify="flex-start" className={classes.roomContainer}>
       <Grid item xs={12} md={8}>
        <div className={classes.chatWindow}>
        <Typography className={classes.greeting} variant="h5">Welcome to room {props.user.room}!</Typography>
        {fields.messageList.map((msg, index) => <Message key={index} message={msg.text} username={msg.username} />)}
        </div>
       </Grid>
       <Grid item xs={12} md={4}>
        <div className={classes.members}>
        <Typography className={classes.greeting} variant="h5">Members</Typography>
        <List>
        {users.map(user => {
          return (
            <ListItem className="user-name">
              <ListItemText primary={user.username} />
            </ListItem>
          )
        })}
        </List>
        </div>
       </Grid>
      </Grid>
    )
 // }

  return (
    <div className="loading">Adding you to the room, please wait..</div>
  )

}

export default withStyles(styles)(ChatRoom);