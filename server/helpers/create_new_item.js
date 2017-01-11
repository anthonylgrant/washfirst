const createNewItem = (req, res, knex, user_id) => {

  let newItem = req.body;
  newItem.tags = newItem.tags.split(' ');

  const addTagToItemTag = (tag, item_id) => new Promise((resolve, reject) => {

    knex('tags').insert({content: tag}).returning('id').asCallback((err, tag_id) => {
    if (tag_id) {
      knex('item_tag').insert({'tag_id': tag_id[0], 'item_id': item_id}).asCallback((err, rows) => {
        if (err) { reject("rejected inside addTagToItemTag - 1"); }
        else { resolve(); }
      });
    } else {
      knex('tags').select('id').where('content', tag).asCallback((err, rows) => {
        if (err) { reject("rejected inside addTagToItemTag - 2"); }
        else {
          tag_id = rows[0].id;
          knex('item_tag').insert({'tag_id': tag_id, 'item_id': item_id}).asCallback((err, rows) => {
            if (err) { reject("rejected inside addTagToItemTag - 3"); }
            else { resolve(); }
          });
        }
      });
    };
    });
  });

  const addItem = (newItem, user_id) => {
    console.log("i'm here 6: ", newItem);
    knex('items').insert({
      type: newItem.type.toLowerCase(),
      gender: newItem.gender.toLowerCase(),
      size: newItem.size,
      description: newItem.description,
      img_url: newItem.img_url,
      user_id: user_id
    }).returning('id').asCallback((err, item_id) => {
      if (err) throw err;
      let promiseArr = [];
      newItem.tags.forEach((tag) => {
        promiseArr.push(addTagToItemTag(tag, item_id[0]));
      });
      Promise.all(promiseArr).then(() => {
        res.send("item created");
      });
    });
  };

  addItem(newItem, user_id);

}

module.exports = createNewItem;
