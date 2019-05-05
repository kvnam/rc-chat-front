import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%'
  }
});

export interface Props extends WithStyles<typeof styles>, RouteComponentProps {
  roomName: string
 }

function ChatRoom(props: Props){

  return (
    <Grid container alignItems="flex-start" justify="flex-start">
     
    </Grid>
  )

}

export default withStyles(styles)(withRouter(ChatRoom));