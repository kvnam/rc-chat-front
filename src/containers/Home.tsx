import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import PickUserName from '../components/Room/Forms/PickUsername';
import { getUserService } from '../services/Users';

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%"
  }
});
export interface Props extends WithStyles<typeof styles> { }

/**
 *  Home container
 * 
 * @param props 
 */
function Home(props: Props) {

  const [fields, setFields] = useState({
    username: '',
    usernameError: false,
    usernameHelperText: 'Only characters and numbers allowed and length should be between 6 - 8.',
    room: 'Default',
    userService: getUserService()
  });

  useEffect(() => {
    if(fields.username.length > 2){
      let isValid = fields.userService.checkUsername(fields.username);
      setFields({...fields, usernameError: !isValid});
    }    
  }, [fields.username])

  /**
   *  Handle input change of all form elements 
   * 
   * @param event FormEvent
   * @param type Form element name
   */
  const onInputChange = (event: React.FormEvent<EventTarget>, type: string) => {
    let eventTarget = event.target as HTMLInputElement;
    setFields({ ...fields, [type]: eventTarget.value });
  }

  /**
   *  Submit form content to API
   *  Add user to room and connect to WebSocket API
   * 
   * @param event MouseEvent
   * @todo Add validation
   * @todo Finish form submission
   */
  const onFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
  }

  const { classes } = props;
  return (
    <Grid className={classes.root} container alignItems="center" justify="center">
      <Grid item xs={12} md={6}>
        <PickUserName
          room={fields.room}
          usernameHelperText={fields.usernameHelperText}
          username={fields.username}
          usernameError={fields.usernameError}
          onInputChange={onInputChange}
          onSubmit={onFormSubmit} />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Home);