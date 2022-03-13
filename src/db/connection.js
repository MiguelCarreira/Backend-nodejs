const pg = require('pg');
const { connection } = require('../../knexfile');
const client = new pg.Client(connection);
client.connect();
module.exports = client;
