#!/bin/sh
":" //# comment; exec /usr/bin/env node --harmony-async-await "$0" "$@"

const connection = require('../server/db/knexfile.js').development;
const knex = require('knex')(connection);

changeItemTags = (req, res) => {

  // const { knex } = req;

  // let data = JSON.parse(req.body.data);

  let data = {
    type: 'editted',
    gender: 'editted',
    size: 999,
    description: "editted editted",
    img_url: "some editted url"
  };

  let itemInfo = data;
  let item_id = 2;
  let tags = ["green", "jacket", "edit1", "leather", "edit2", "foo", "bar"];

  addOrUpdateTag = (tag, item_id) => new Promise((resolve, reject) => {
    knex('item_tag').where('item_id', item_id).del().then(() => {
      knex('tags').insert({content: tag}).returning('id').asCallback((err, id) => {
      if (id) {
        knex('item_tag').insert({'tag_id': id[0], 'item_id': item_id}).asCallback((err, rows) => {
          if (err) { reject(); }
          else { resolve(); }
        });
      } else {
        knex('tags').select('id').where('content', tag).asCallback((err, rows) => {
          if (err) { reject(); }
          else {
            console.log("IT EXISTS: ", rows, tag);
            tag_id = rows[0].id;

            knex('item_tag').insert({'tag_id': tag_id, 'item_id': item_id}).asCallback((err, rows) => {
              if (err) { reject(); }
              else { resolve(); }
            });
          }
        });
      };
      });
    });
  });


  // editItem = (itemInfo, item_id) => {
  //   knex('items').where('id', item_id).update(itemInfo).then(() => {
  //     return addOrUpdateTags(tags, item_id);
  //     // let promiseArr = [];
  //     // tags.forEach((tag) => {
  //     //   promiseArr.push(addOrUpdateTag(tag, item_id));
  //     // });
  //     // console.log("im here");
  //     // Promise.all(promiseArr).then(() => {
  //     //   console.log("tags updated on item");
  //     // });
  //   });
  // }

  // editItem(itemInfo, item_id);

}

// module.exports = changeUserPreferences;

changeItemTags(null, null, knex);
