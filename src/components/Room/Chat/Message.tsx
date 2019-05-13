import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, Theme, WithStyles, ListItem, ListItemText } from '@material-ui/core';


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

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    marginTop: '5rem'
  },
  msgWindow: {
    width: '100%',
    padding: '1rem'
  }
})

export interface Props extends WithStyles<typeof styles> {
  message: Message
}

const Message:React.FunctionComponent<Props> = props => {
  const { classes, message } = props;
  return (
    <ListItem alignItems="flex-start" className={classes.msgWindow}>
        <ListItemText
          primary={message.user ? message.user.username : "Notice:"}
          secondary={message.msg}
        />
    </ListItem>
  )
}

export default withStyles(styles)(Message);