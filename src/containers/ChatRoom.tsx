import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import Message from '../components/Room/Chat/Message';

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
  userName: {
    color: '#3498db',
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  inline: {
    display: 'inline'
  }
});

export interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  roomName: string
 }

function ChatRoom(props: Props){

  const [ fields, setFields ] = useState({
    users: [],
    userCount: 0,
    messageList: [{
      text: '',
      username: ''
    }]
  });

  return (
    <Grid container alignItems="flex-start" justify="flex-start">
     <Grid item xs={12} md={12}>
      <Typography variant="body1">Welcome to {props.roomName}!</Typography>
      {fields.messageList.map(msg => <Message message={msg.text} username={msg.username} />)}
     </Grid>
    </Grid>
  )

}

export default withStyles(styles)(withRouter(ChatRoom));