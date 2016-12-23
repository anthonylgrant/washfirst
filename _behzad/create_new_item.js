const connection = require('../server/db/knexfile.js').development;
const knex = require('knex')(connection);

createNewItem = (req, res, knex) => {

  // let data = JSON.parse(req.body.data);
  let data = {
    type: 'bottom',
    gender: 'male',
    size: 30,
    description: "behzad adding item",
    img_url: "some img url",
    user_id: 5,
    tags: ["green", "jacket", "new1", "leather", "new2"]
  };

  let newItem = data.itemInfo || data;
  let itemTags = data.tags;

  addTagToItemTag = (tag, item_id) => new Promise((resolve, reject) => {

    knex('tags').insert({content: tag}).returning('id').asCallback((err, tag_id) => {
    if (tag_id) {
      knex('item_tag').insert({tag_id: tag_id[0], user_id: item_id}).asCallback((err, rows) => {
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

  addItem = (newItem, user_id) => {
    knex('items').insert({
      type: newItem.type,
      gender: newItem.gender,
      size: newItem.size,
      description: newItem.description,
      img_url: newItem.img_url,
      user_id: user_id
    }).returning('id').asCallback((err, item_id) => {
      if (err) throw err;
      let promiseArr = [];
      itemTags.forEach((tag) => {
        promiseArr.push(addTagToItemTag(tag, item_id));
      });
      Promise.all(promiseArr).then(() => {
        console.log("user item updated");
      });
    });
  };

  addItem(newItem, 5);

}

module.exports = createNewItem;
