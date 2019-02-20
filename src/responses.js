const items = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getItems = (request, response) => {
  const responseJSON = {
    items,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getItemsMeta = (request, response) => respondJSONMeta(request, response, 200);

const addItem = (request, response, body) => {
  const responseJSON = {
    message: 'Please fill in all fields.',
  };

  if (!body.name || !body.description) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (items[body.name]) {
    responseCode = 204;
  } else {
    items[body.name] = {};
  }

  items[body.name].name = body.name;
  items[body.name].type = body.type;
  items[body.name].description = body.description;
  items[body.name].rarity = body.rarity;

  if (responseCode === 201) {
    responseJSON.message = 'Item Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getItems,
  getItemsMeta,
  notReal,
  notRealMeta,
  addItem,
};
