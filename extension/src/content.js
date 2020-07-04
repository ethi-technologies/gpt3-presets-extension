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
  const triggerContainer = document.querySelector(".title-wrapper");

  if (triggerContainer) {
    clearInterval(triggerWait);
    const triggerContainerPosition = triggerContainer.getBoundingClientRect();
    const top = triggerContainerPosition.y + 10;
    const left = parseInt(triggerContainerPosition.x + triggerContainerPosition.width) / 2 - 25;

    const trigger = document.createElement('div');
    trigger.style.cssText = `position: absolute; top: ${top}px; left: ${left}px;`;
    trigger.innerHTML = `
    <div style='position: relative'>
      <a href='javascript:void(0)' class='community-presets' style='margin-left: 5px; color: rgba(255,57,90,.82);'>Community presets</a>
    </div>`;
    document.body.appendChild(trigger);

    const presetsLink = document.querySelector(".community-presets");
    presetsLink.onclick = () => {
      document.querySelector("#gpt3-presents").style.display = "block";
    }
  }
}, 100);
