import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
if(process.env.NODE_ENV === "development"){
  require('dotenv').config();
}

const AppComponent = (<BrowserRouter>
<App />
</BrowserRouter>);


ReactDOM.render(AppComponent, document.getElementById('root'));

