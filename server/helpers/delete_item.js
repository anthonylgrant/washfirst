const config = require('./knex_config.json');
const knex = require('knex')({ client: 'pg', connection: config });

function deleteItem(itemId) {
  knex('item_tag')
    .where('item_id', itemId)
    .del()
    .then(() => {
      knex('items')
        .where('id', itemId)
        .del()
        .then(() => {
          return;
        })
    })

}



deleteItem(3);
module.exports = deleteItem;
