let items = [];

exports.seed = function(knex, Promise) {

  for (let i = 0; i < 10; i++) {
    items.push(knex('items').insert({ type: "shoes", size: `${i}`, image: "img_link_${i}", description: "description_${i}", user_id: i + 1 }));
  }

  for (let i = 0; i < 10; i++) {
    items.push(knex('items').insert({ type: "tops", size: `${i}`, image: "img_link_${i}", description: "description_${i}", user_id: i + 1 }));
  }

  for (let i = 0; i < 10; i++) {
    items.push(knex('items').insert({ type: "bottoms", size: `${i}`, image: "img_link_${i}", description: "description_${i}", user_id: i + 1 }));
  }


  items.push(knex('items').orderBy('id'));

  return Promise.all(items);
};