// const connection = require('../server/db/knexfile.js').development;
// const knex = require('knex')(connection);

createNewItem = (data, knex) => {

  // let data = {
  //   type: 'bottom',
  //   gender: 'male',
  //   size: 30,
  //   description: "behzad adding item",
  //   img_url: "some img url",
  //   user_id: 5,
  //   tags: ["green", "jacket", "new1", "leather", "new2"]
  // };

  addTagToItemTag = (tag, item_id) => new Promise((resolve, reject) => {

    knex('tags').insert({content: tag}).returning('id').asCallback((err, tag_id) => {
    if (tag_id) {
      knex('item_tag').insert({'tag_id': tag_id[0], 'item_id': item_id}).asCallback((err, rows) => {
        console.log("rows - 1 - item_id", item_id);
        if (err) { reject("rejected inside addTagToItemTag - 1"); }
        else { resolve(); }
      });
    } else {
      knex('tags').select('id').where('content', tag).asCallback((err, rows) => {
        console.log("rows - 2 - item_id", item_id);
        if (err) { reject("rejected inside addTagToItemTag - 2"); }
        else {
          console.log("IT EXISTS: ", rows, tag);
          tag_id = rows[0].id;

          knex('item_tag').insert({'tag_id': tag_id, 'item_id': item_id}).asCallback((err, rows) => {
            console.log("rows - 3 - item_id", item_id);
            if (err) { reject("rejected inside addTagToItemTag - 3"); }
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
        console.log("I made it to for loop - " + item_id);
        promiseArr.push(addTagToItemTag(tag, item_id[0]));
      });
      Promise.all(promiseArr).then(() => {
        console.log("WWWWWASDASDA ASDASDASD ASDASD AASDAS user item updated");
      });
    });
  };

  let newItem = data;
  let itemTags = data.tags;
  addItem(newItem, data.user_id);

}

module.exports = createNewItem;
