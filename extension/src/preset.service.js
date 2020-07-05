const apiURL = 'http://localhost:4000/api/v1';

export const presetService = {
  create,
  fetchCategories,
  fetchPresets,
};

async function create(preset) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preset),
    mode: 'cors',
  };

  return fetch(`${apiURL}/presets`, requestOptions).then(handleServiceResponse);
}

async function fetchCategories() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  };


  const res = await fetch(`${apiURL}/presets/categories`, requestOptions);  
  const text = await res.text();
  console.log(res)

  console.log('mata!!!')
  console.log(text)
  return JSON.parse(text);
}

async function fetchPresets(category) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
  };
  return fetch(`${apiURL}/presets?category=${category}`, requestOptions).then(handleServiceResponse);  
}

function handleServiceResponse(response) {
  console.log(response);
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    console.log('text is')
    console.log(text)
    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
      