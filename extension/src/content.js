/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import root from 'react-shadow';

import App from './App';

import tailwindcss from './tailwind.css';

class Main extends React.Component {
  render() {
    return (
      <root.div>
        <style>{tailwindcss}</style>
        <App />
      </root.div>
    )
  }
}

const app = document.createElement("div");
app.id = "gpt3-presents";

document.body.appendChild(app);
ReactDOM.render(<Main />, app)