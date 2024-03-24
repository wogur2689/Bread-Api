// queryLoader.js

const fs = require('fs');
const path = require('path');

const queryFile = path.resolve(__dirname, 'queries.json');

function loadQuery(queryName) {
  const queries = JSON.parse(fs.readFileSync(queryFile, 'utf8'));
  return queries[queryName];
}

module.exports = loadQuery;