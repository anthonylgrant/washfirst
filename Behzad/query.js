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

// knex('items').select().asCallback((err, rows) => {
//   console.log(rows);
// });

let userPrefrence = ['blue'];

userPrefrence.forEach((tag) => {
  knex('items').select().whereRaw(`to_tsvector(tsv) @@ to_tsquery('${tag}')`).asCallback((err, rows) => {
    if (err) throw err;
    console.log(rows);
  });


  // knex.raw(`SELECT id FROM items WHERE to_tsvector(tsv) @@ to_tsquery('${tag}')`).asCallback((err, rows) => {
  //   if (err) throw err;
  //   console.log(rows);
  // });
});
