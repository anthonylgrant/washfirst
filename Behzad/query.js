dbConfig = {
  "user": "development",
  "password": "development",
  "database": "wash_first_dev",
  "host": "localhost",
  "port": 5432,
  "ssl": true
}


const knex = require('knex')({
  client: 'pg',
  connection: dbConfig
});


let userPrefrence = 'blue | green';
let itemArr = [];
let itemSet = new Set();


knex.raw(`SELECT id, ts_rank(to_tsvector(tsv), to_tsquery('blue | green')) AS rank
    FROM items
    WHERE to_tsvector(tsv) @@ to_tsquery('${userPrefrence}')
    ORDER BY rank DESC;`).asCallback((err, rows) => {
      console.log(rows.rows);
});
