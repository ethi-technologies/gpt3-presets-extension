/* eslint-disable no-undef */

const apiURL = 'http://localhost:4000/api/v1';

export const presetService = {
  create,
  fetchCategories,
  fetchPresets,
};

function create(preset, callback) {
  chrome.runtime.sendMessage({
    contentScriptQuery: "queryCreatePreset",
    preset: preset,
    }, json => callback(json));
}

function fetchCategories(callback) {
  console.log('senging message')
  chrome.runtime.sendMessage({
    contentScriptQuery: "queryCategories",
    }, json => callback(json));
}

async function fetchPresets(category, callback) {
  chrome.runtime.sendMessage({
    contentScriptQuery: "queryPresets",
    category: category,
    }, json => callback(json));
}
