/*global chrome*/

import React, { useEffect, useState } from 'react'

import { presetService } from './preset.service.js';

const DirectoryPresets = (props) => {
  const [ presets, setPresets ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (props.activeCategory) {
        const res = await presetService.fetchPresets(props.activeCategory);

        if (res.presets) {
          setPresets(res.presets);
        }
      }
    }

    fetchData();
  }, [ props.activeCategory ]);

  const presetsHTML = presets ? presets.map((preset) => (
    <tr className="bg-white" key={preset.id}>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
        {preset.author}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        {preset.name}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        {preset.description}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        {preset.input}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
      </td>
    </tr>
  )) : [];

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <table className="min-w-full">
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
