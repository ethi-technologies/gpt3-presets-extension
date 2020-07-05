/*global chrome*/

import React, { useEffect, useState } from 'react'

import DirectoryPresets from './DirectoryPresets';

import { presetService } from './preset.service.js';

const DirectoryModal = (props) => {
  const [ categories, setCategories ] = useState(false);
  const [ activeCategory, setActiveCategory ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await presetService.fetchCategories();

      if (res.categories) {
        setCategories(res.categories);

        if (!activeCategory) {
          setActiveCategory(res.categories[0]);
        }
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (e, category) => {
    setActiveCategory(category);
  }

  const categoriesHTML = categories ? categories.map((category, index) =>
    (<a href="javascript:void(0)"
      key={category}
      onClick={e => handleCategoryClick(e, category)}
      className={[
        "group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-900 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150",
        activeCategory == category ? "bg-gray-100" : "",
        index > 0 ? 'mt-1' : '',
      ].join(' ')}>
      <span className="truncate">
        {category}
      </span>
    </a>
  )) : [];

  return (
    <div
      className={[
        props.visibleModal === 'directory' ? "sm:block" : "sm:hidden",
        "z-30 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center",
      ].join(' ')}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-5xl sm:w-full sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between sm:space-x-4">
          <div>{categoriesHTML}</div>

          <div className="flex-1">
            <DirectoryPresets activeCategory={activeCategory} />
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          ACTIONS
        </div>
      </div>
    </div>
  );
}

export default DirectoryModal;
