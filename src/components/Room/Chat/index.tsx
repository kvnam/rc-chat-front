import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';

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
  users: Number
}

const ChatRoom:React.FunctionComponent<Props> = props => {
  const { classes } = props;
  return (
    <Grid container className={`pick-username__form ${classes.root}`}>
      <Grid item className={classes.msgWindow}>
        <Typography variant="h6">Welcomg to the XYZ room</Typography>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(ChatRoom);