import React from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import PickUserName from '../components/Room/Forms/PickUsername';

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%"
  }
});
export interface Props extends WithStyles<typeof styles>{

}

interface State {
  username: string,
  room: string
}

class Home extends React.Component<Props, State>{

  state: State = {
    username: "",
    room: "Default"
  }

  onUsernamePick = (username: string, room: string) => {
    console.log(`Username picked ${username} ${room}`);
  }

  render(){
    const { classes } = this.props;
    return (
      <Grid className={classes.root} container alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <PickUserName room={this.state.room} username={this.state.username} onSubmit={this.onUsernamePick} />
        </Grid>  
      </Grid>
    )
  }
}

export default withStyles(styles)(Home);