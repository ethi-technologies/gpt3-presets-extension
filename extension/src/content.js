/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import root from 'react-shadow';

import App from './App';

class Main extends React.Component {
  render() {
    return (
      <root.div>
        <App/> 
      </root.div>
    )
  }
}

const app = document.createElement("div");
app.id = "gpt3-presents";
app.style.display = "none";

document.body.appendChild(app);
ReactDOM.render(<Main />, app)

const triggerWait = setInterval(() => {
  const triggerContainer = document.querySelector(".title-wrapper .title-section:last-child");
  if (triggerContainer) {
    clearInterval(triggerWait);
    triggerContainer.innerHTML += "<a href='javascript:void(0)' class='community-presets' style='margin-left: 5px; color: rgba(255,57,90,.82);'>Community presets</button>";

    const presetsLink = document.querySelector(".community-presets");
    presetsLink.onclick = () => {
      app.style.display = "block";
    }
  }
}, 100);
