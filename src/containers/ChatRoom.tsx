import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import Message from '../components/Room/Chat/Message';
import { getUserService } from '../services/Users';

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
    width: '80vw',
    margin: 'auto',
    padding: '1.5rem',
    border: '1px solid #dadfe1',
    backgroundColor: '#f2f1ef',
    color: '#2e3131'
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

  if(fields.userAdded){
    return (
      <Grid container alignItems="flex-start" justify="flex-start">
       <Grid item xs={12} md={12}>
        <Typography className={classes.greeting} variant="body1">Welcome to {props.user.room}!</Typography>
        {fields.messageList.map((msg, index) => <Message key={index} message={msg.text} username={msg.username} />)}
       </Grid>
      </Grid>
    )
  }

  return (
    <div className="loading">Adding you to the room, please wait..</div>
  )

}

export default withStyles(styles)(ChatRoom);