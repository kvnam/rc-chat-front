import React from 'react';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import './index.scss';

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%'
  },
});

export interface Props extends WithStyles<typeof styles> {
  roomName: String,
  roomType: String,
  userCount: Number
}

const ShortDisplay: React.FunctionComponent<Props> = props => {
  return (
    <div className="short-display__container">
      <Typography variant="body1" color="inherit">{props.roomName}</Typography>
      <div className="short-display__container--info">
        <div className="room-type">
          {props.roomType}
        </div>
        <div className="user-count">
         {`No. of users : ${props.userCount}`}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(ShortDisplay);