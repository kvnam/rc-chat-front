import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './components/Header';
import Home from './containers/Home';
type Props = {};

const App: React.FunctionComponent<Props> = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
    <Switch>
      <Route path="/" component={Home} exact/>
    </Switch>
    </React.Fragment>
  );
}

export default App;
