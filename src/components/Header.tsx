import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  rcAppBar: {
    color: "#000"
  }
});

export interface Props extends WithStyles<typeof styles> {}

interface State{

}

class Header extends React.Component<Props, State> {

  render(){
    return (
      <AppBar className="rc-appbar" position="static">
        <Toolbar>
          <Typography className="app-brand" variant="h6" color="inherit">Haiku Me!</Typography>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(Header);