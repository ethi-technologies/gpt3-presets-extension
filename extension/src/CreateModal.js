/*global chrome*/

import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";

import { presetService } from './preset.service.js';

const CreateModal = (props) => {
  const [ categories, setCategories ] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await presetService.fetchCategories();

      if (res.categories) {
        setCategories(res.categories);
      }
    }

    fetchData();
  }, []);

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await presetService.create({
      preset: data,
    })
  }

  return (
    <div
      className={[
        props.visibleModal === 'create' ? "sm:block" : "sm:hidden",
        "z-30 fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center",
      ].join(' ')}
    >
      <div className="fixed inset-0 transition-opacity">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full sm:p-6">
          <div className="sm:flex sm:items-start sm:justify-between sm:space-x-4">        
            <div>
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Create a new preset
                </h3>
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  This information will be displayed publicly in the directory with you as the author.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium leading-5 text-gray-700">
                    Preset input
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <textarea ref={register({ required: true })} name="input" rows="4" className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"></textarea>
                  </div>
                  <p className="mt-2 text-sm text-red-600">{errors.input && "This field is required"}</p>
                  <p className="mt-2 text-sm text-gray-500">The GPT-3 input.</p>
                </div>

                <div class="sm:col-span-3">
                  <label for="category" class="block text-sm font-medium leading-5 text-gray-700">
                    Category
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <select  ref={register({ required: true })} name="category" class="form-select block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                      {(categories || []).map((category) => (
                        <option value={category} key={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-2 text-sm text-red-600">{errors.category && "This field is required"}</p>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium leading-5 text-gray-700">
                    Preset name
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input ref={register({ required: true })} name="name" className="flex-1 form-input block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                  <p className="mt-2 text-sm text-red-600">{errors.name && "This field is required"}</p>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium leading-5 text-gray-700">
                    Preset description
                  </label>
                  <div className="mt-1 rounded-md shadow-sm">
                    <input ref={register({ required: true })} name="description" className="flex-1 form-input block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                  <p className="mt-2 text-sm text-red-600">{errors.description && "This field is required"}</p>
                  <p className="mt-2 text-sm text-gray-500">What does this preset do?</p>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium leading-5 text-gray-700">
                    Author
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input ref={register({ required: true })} name="author" className="flex-1 form-input block w-full min-w-0 rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                  </div>
                  <p className="mt-2 text-sm text-red-600">{errors.author && "This field is required"}</p>
                </div>
              </div>
            </div>  
          </div>
        
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Create
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Cancel
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateModal;
