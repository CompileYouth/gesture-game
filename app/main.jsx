import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const app = document.createElement('div');
app.setAttribute("id", "app");

ReactDOM.render(
    <App />,
    document.body.appendChild(app)
);
