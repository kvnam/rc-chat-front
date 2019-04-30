import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const AppComponent = (<BrowserRouter>
<App />
</BrowserRouter>);


ReactDOM.render(AppComponent, document.getElementById('root'));

