/*global chrome*/

import React, { useEffect, useState } from 'react'

import { presetService } from './preset.service.js';

import Truncate from 'react-truncate';

const DirectoryPresets = (props) => {
  const [ presets, setPresets ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (props.activeCategory) {
        presetService.fetchPresets(props.activeCategory, (json) => {
          if (json && json.presets) {
            setPresets(json.presets);
          }
        });
      }
    }

    fetchData();
  }, [ props.activeCategory ]);

  const handleApply = (e, preset) => {
    const textarea = document.querySelector(".editor-container");

    const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    nativeTextAreaValueSetter.call(textarea, preset.input);
    
    const event = new Event("input", { bubbles: true});
    textarea.dispatchEvent(event);

    props.setVisibleModal('');
  }

  const presetsHTML = (presets && presets.length > 0) ? presets.map((preset) => (
    <tr className="bg-white" key={preset.id}>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
        {preset.author}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        {preset.name}
      </td>
      <td className="px-6 py-4  text-sm leading-5 text-gray-500">
        {preset.description}
      </td>
      <td className="px-6 py-4 text-sm leading-5 text-gray-500">
        <Truncate lines={3} ellipsis={<span>...</span>}>
          {preset.input}
        </Truncate>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
        <a href="javascript:void(0)" onClick={e => handleApply(e, preset)} className="text-indigo-600 hover:text-indigo-900">Apply</a>
      </td>
    </tr>
  )) : (
    <tr className="bg-white" key="none">
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900" colspan="4">
        No presets found.
      </td>
    </tr>
  );

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Preset
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody>
                {presetsHTML}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DirectoryPresets;
