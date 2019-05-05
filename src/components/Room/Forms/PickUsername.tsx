import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import {
  InputAdornment,
  createStyles,
  withStyles,
  Theme,
  WithStyles,
  Typography,
  FormControl,
  FormLabel,
  Button
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: "#f6f6f6",
      marginTop: "5rem"
    }
  });

export interface Props extends WithStyles<typeof styles> {
  username: string;
  room: string;
  usernameError: boolean;
  roomError: boolean;
  onSubmit: Function;
  classes: {
    root: string;
  };
  onInputChange: Function;
}

const PickUsername: React.FunctionComponent<Props> = props => {
  const { classes } = props;
  return (
    <Grid container className={`pick-username__form ${classes.root}`}>
      <Grid item xs={12} md={12}>
        <Typography variant="h3">
          Please select your username and room!
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <form className="rc-form form" onSubmit={() => props.onSubmit()}>
          <TextField
            value={props.username}
            className="username-text"
            label="Username"
            onChange={(event) => props.onInputChange(event, "username")}
            error={props.usernameError}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <TextField
            value={props.room}
            className="room-text"
            onChange={(event) => props.onInputChange(event, "room")}
            error={props.roomError}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
          <Button variant="contained" color="primary">Submit</Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(PickUsername);
