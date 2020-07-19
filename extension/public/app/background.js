// const apiURL = 'http://localhost:4000/api/v1';
const apiURL = 'https://prompts.ew.r.appspot.com/graphql';

chrome.runtime.onMessage.addListener( 
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "queryCreatePreset") {
      create(request.preset)
        .then(json => sendResponse(json))
        .catch(err => console.log(err))
      return true;
    } else if (request.contentScriptQuery == "queryCategories") {
      fetchCategories()
        .then(json => sendResponse(json))
        .catch(err => console.log(err))
      return true;
    } else if (request.contentScriptQuery == "queryPresets") {
      fetchPresets(request.category)
        .then(json => sendResponse(json))
        .catch(err => console.log(err))
      return true;
    }
  }
);

function create(preset) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preset),
  };

  return fetch(`${apiURL}/presets`, requestOptions).then(handleServiceResponse);
}

function fetchCategories() {
  // TODO: tags query doesn't exist on server yet
  const getTags = {
    query: {
      tags: {
        tag
      }
    }
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(getPrompts)
  };
  return fetch(`${apiURL}`, requestOptions).then(handleServiceResponse);  
}

function fetchPresets(category) {
  const getPrompts = {
    query: {
      prompts: {
        id,
        name,
        author,
        description,
        text,
        tags,
        likes
      }
    }
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(getPrompts)
  };
  return fetch(`${apiURL}`, requestOptions).then(handleServiceResponse);  
}

function handleServiceResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
      