import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, withStyles, Theme, WithStyles } from '@material-ui/core';
import PickUserName from '../components/Room/Forms/PickUsername';

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%"
  }
});
export interface Props extends WithStyles<typeof styles>{ }

/**
 *  Home container
 * 
 * @param props 
 */
function Home(props: Props){

  const [ fields, setFields ] = React.useState({
    username: '',
    usernameError: false,
    room: 'Default',
    roomError: false
  })

  /**
   *  Handle input change of all form elements 
   * 
   * @param event FormEvent
   * @param type Form element name
   */
  const onInputChange = (event: React.FormEvent<EventTarget>, type: string) => {
    
    let eventTarget = event.target as HTMLInputElement;
    console.log(`Field picked ${type} ${eventTarget.value}`);
    setFields({...fields, [type]: eventTarget.value});

  }

  /**
   *  Submit form content to API
   * 
   * @param event MouseEvent
   */
  const onFormSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('On form submitted');
    
  }

  const { classes } = props;
    return (
      <Grid className={classes.root} container alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <PickUserName 
            room={fields.room} 
            roomError={fields.roomError}
            username={fields.username} 
            usernameError={fields.usernameError}
            onInputChange={onInputChange} 
            onSubmit={onFormSubmit} />
        </Grid>  
      </Grid>
    )
  }

export default withStyles(styles)(Home);