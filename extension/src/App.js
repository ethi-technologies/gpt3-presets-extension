/*global chrome*/

import React, { useEffect, useState } from 'react';

import CreateModal from './CreateModal';
import DirectoryModal from './DirectoryModal';

const App = (props) => {
  const [ visibleModal, setVisibleModal ] = useState(false);

  useEffect(() => {
    /* This makes sure to add the trigger buttons outside of React. */
    const oldTrigger = document.querySelector("#presets_trigger");
    if (oldTrigger) {
      oldTrigger.parentNode.removeChild(oldTrigger);
    }

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
          setVisibleModal('directory');
        }

        const addPresetLink = document.querySelector(".add-preset");
        addPresetLink.onclick = () => {
          setVisibleModal('create');
          
        }
      }
    }, 100);
    /* End of outside React trigger buttons. */
  }, [ visibleModal ]);

  return (
    <>
      <CreateModal visibleModal={visibleModal} setVisibleModal={setVisibleModal} /> 
      <DirectoryModal visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
    </>
  );
}

export default App;
