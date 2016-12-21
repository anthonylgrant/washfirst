/*
  knex query to get tags from db
*/

'use strict';

const knex = require('knex')({
  client: 'pg',
  // connection: {
  //     "user": "development",
  //     "password": "development",
  //     "database": "scratch",
  //     "host": "localhost",
  //     "port": 5432
  //   }
  connection: {
    "user": "jtdkcmsdivuwnb",
    "password": "8a9f75784b5d01323417c5a50d7ada143a4c4d8e1d61eda300256acc960b5ee8",
    "database": "d30s0csr4pn180",
    "host": "ec2-54-235-247-224.compute-1.amazonaws.com",
    "port": 5432,
    "ssl": true
  }
});


function getTags() {
  return knex.select('content')
              .from('tags')
}

module.exports = getTags;
