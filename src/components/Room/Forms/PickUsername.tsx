import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { InputAdornment, createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    marginTop: '5rem'
  }
})

export interface Props extends WithStyles<typeof styles> {
  username: string
  room: string
  onSubmit: Function
}

const PickUsername:React.FunctionComponent<Props> = props => {
  const { classes } = props;
  return (
    <Grid container className={`pick-username__form ${classes.root}`}>
      <Grid item>
        <TextField value={props.username} className="username-text" label="Username" InputProps={{
          startAdornment:(
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          )
        }} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(PickUsername);