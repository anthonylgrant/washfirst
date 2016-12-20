// Get inventory excluding logged-in user's items
"use strict"

const knex = require('knex')({
  client: 'pg',
  connection: {
      "user": "jtdkcmsdivuwnb",
      "password": "8a9f75784b5d01323417c5a50d7ada143a4c4d8e1d61eda300256acc960b5ee8",
      "database": "d30s0csr4pn180",
      "host": "ec2-54-235-247-224.compute-1.amazonaws.com",
      "port": 5432,
      "ssl": true
    }
});


/*
  user: {
    size: {
      shoe_min: "",
      shoe_max: "",
      bottom_min: "",
      bottom_max: "",
      top_min: "",
      top_max: ""
    },
    wardrobe: {
      item_id: {
        type: "top/bottom/shoe",
        size: "size_as_string",
        tags: "string_of_tags"
      },
      item_id: {
        type: "top/bottom/shoe",
        size: "size_as_string",
        tags: "string_of_tags"
      }
    },
    preferences: "string_of_tags"
  }



items that don't belong to user, and then from those,

*/









const logged_in_user_id = 1;





function getInventory() {
//  - Gets all items (excluding those belonging to logged in user)
//    and within size rang and returns them as objects.
//
// `SELECT id,  ts_rank(to_tsvector(tsv), to_tsquery('blue | green')) AS rank FROM items WHERE to_tsvector(tsv) @@ to_tsquery('blue | green') AND user_id != ${logged_in_user_id} ORDER BY rank DESC;`
//

/*
  QUERY WITH RANKING
`SELECT id, user_id, ts_rank(to_tsvector(tsv), to_tsquery('blue | green')) AS rank FROM items WHERE to_tsvector(tsv) @@ to_tsquery('') AND user_id != ${logged_in_user_id} ORDER BY rank DESC;`
*/

}
knex.raw('SELECT content FROM tags JOIN tag_user ON tags.id = tag_id WHERE user_id = 1')
.then((resolution) => {
  console.log(resolution.rows);
})
.then(() => {

  knex.raw(`SELECT id, user_id, type, size, tsv FROM items WHERE user_id != ${logged_in_user_id};`)
  .then((resolution) => {
    console.log('these are the items that don\'t belong to user:\n', resolution.rows);
  })

});







module.exorts = getInventory
