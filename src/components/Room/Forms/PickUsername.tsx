import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import DoneIcon from '@material-ui/icons/Done';
import {
  InputAdornment,
  createStyles,
  withStyles,
  Theme,
  WithStyles,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";


const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: "#f6f6f6",
      marginTop: "5rem"
    },
    input: {
      width: '100%',
      margin: '2rem 1rem'
    },
    headerText: {
      textAlign: 'center',
      padding: '1rem'
    },
    form: {
      padding: '1rem',
      textAlign: 'center'
    }
  });

export interface Props extends WithStyles<typeof styles> {
  username: string;
  room: string;
  usernameError: boolean;
  usernameHelperText: string;
  onSubmit: Function;
  classes: {
    root: string;
    input: string;
    headerText: string;
    form: string;
  };
  onInputChange: Function;
}

const PickUsername: React.FunctionComponent<Props> = props => {
  const { classes } = props;
  return (
    <Grid container className={`pick-username__form ${classes.root}`} alignContent="center" justify="center">
      <Grid item xs={12} md={12}>
        <Typography variant="h4" className={classes.headerText}>
          Please select your username and room!
        </Typography>
      </Grid>
      <Grid item xs={12} md={12}>
        <form className={`rc-form ${classes.form}`} onSubmit={() => props.onSubmit()}>
          <TextField
            value={props.username}
            className={`username-text ${classes.input}`}
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
            helperText={props.usernameHelperText}
          />
          <FormControl className={`room-text ${classes.input}`}>
            <InputLabel htmlFor="room-name">Room</InputLabel>
            <Select 
              value={props.room}
              onChange={(event) => props.onInputChange(event, "room")}
              inputProps={{
                name: 'room',
                id: 'room-name'
              }}>
                <MenuItem value="Common">Common</MenuItem>
                <MenuItem value="Haiku">Haiku Me!</MenuItem>
              </Select>
          </FormControl>          
          <Button variant="contained" color="primary">Submit</Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(PickUsername);
