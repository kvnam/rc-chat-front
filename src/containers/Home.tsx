import React from 'react';
import Grid from '@material-ui/core/Grid';
import PickUserName from '../components/Room/Forms/PickUsername';

interface Props {

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
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <PickUserName room={this.state.room} username={this.state.username} onSubmit={this.onUsernamePick} />
        </Grid>  
      </Grid>
    )
  }
}

export default Home;