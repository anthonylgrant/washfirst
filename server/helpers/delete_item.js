const getMainData = require('./get_main_data');

const deleteItem = (itemId, res, knex, user_id) => {
  knex('item_tag')
    .where('item_id', itemId)
    .del()
    .then(() => {
      knex('items')
        .where('id', itemId)
        .del()
        .then(() => {
          getMainData(res, knex, user_id);
        });
    });
};

module.exports = deleteItem;
