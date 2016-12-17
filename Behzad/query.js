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
let itemArr = [];
let itemSet = new Set();

userPrefrence.forEach((tag) => {
  knex('items').select('id').whereRaw(`to_tsvector(tsv) @@ to_tsquery('${tag}')`).asCallback((err, rows) => {
    if (err) throw err;
    console.log(rows);




    rows.forEach((item) => {
      itemArr.push(item.id);
      itemSet.add(item.id);
    });
  });
});

// console.log(itemSet);
