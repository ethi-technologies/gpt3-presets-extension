/*global chrome*/

import React, { useState } from 'react';

import CreateModal from './CreateModal';
import DirectoryModal from './DirectoryModal';

const App = (props) => {
  const [ visibleModal, setVisibleModal ] = useState(false);

  /* This makes sure to add the trigger buttons outside of React. */
  const triggerWait = setInterval(() => {
    const triggerContainer = document.querySelector(".title-wrapper");
  
    if (triggerContainer) {
      clearInterval(triggerWait);
      const triggerContainerPosition = triggerContainer.getBoundingClientRect();
      const top = triggerContainerPosition.y + 10;
      const left = parseInt(triggerContainerPosition.x + triggerContainerPosition.width) / 2 - 175;
  
      const trigger = document.createElement('div');
      trigger.id = 'presets_trigger';
      trigger.style.cssText = `position: absolute; top: ${top}px; left: ${left}px;`;
      trigger.innerHTML = `
      <div style='position: relative'>
        <a href='javascript:void(0)' class='community-presets' style='margin-left: 5px; color: rgba(255,57,90,.82);'>Community presets</a>
        &nbsp;/&nbsp;
        <a href='javascript:void(0)' class='add-preset' style='margin-left: 5px; color: rgba(255,57,90,.82);'>Add preset</a>
      </div>`;
      document.body.appendChild(trigger);
  
      const presetsLink = document.querySelector(".community-presets");
      presetsLink.onclick = () => {
        console.log('dir')
        setVisibleModal('directory');
      }

      const addPresetLink = document.querySelector(".add-preset");
      addPresetLink.onclick = () => {
        console.log('create')
        setVisibleModal('create');
        
      }
    }
  }, 100);
  /* End of outside React trigger buttons. */

  return (
    <>
      <CreateModal visibleModal={visibleModal} /> 
      <DirectoryModal visibleModal={visibleModal} />
    </>
  );
}

export default App;
