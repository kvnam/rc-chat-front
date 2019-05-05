import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, Theme, WithStyles, ListItem, ListItemText } from '@material-ui/core';

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
  message: string,
  username: string
}

const Message:React.FunctionComponent<Props> = props => {
  const { classes } = props;
  return (
    <ListItem alignItems="flex-start" className={classes.msgWindow}>
        <ListItemText
          primary={props.username}
          secondary={props.message}
        />
    </ListItem>
  )
}

export default withStyles(styles)(Message);