import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App.js';

class Main extends React.Component {
    
    render() {
        return(     
            <App></App>
        )
    }
}

ReactDOM.render(
    <Main/>,
  document.getElementById('root')
)