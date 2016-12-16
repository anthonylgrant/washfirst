exports.seed = function(knex, Promise) {
  return Promise.all([

    knex('tags').insert({ category: "color", content: "black" }),
    knex('tags').insert({ category: "color", content: "white" }),
    knex('tags').insert({ category: "color", content: "red" }),
    knex('tags').insert({ category: "color", content: "blue" }),
    knex('tags').insert({ category: "color", content: "green" }),
    knex('tags').insert({ category: "color", content: "yellow" }),
    knex('tags').insert({ category: "color", content: "grey" }),
    knex('tags').insert({ category: "color", content: "oragne" }),

    knex('tags').insert({ category: "style", content: "shirt" }),
    knex('tags').insert({ category: "style", content: "t-shirt" }),
    knex('tags').insert({ category: "style", content: "short-sleeve" }),
    knex('tags').insert({ category: "style", content: "long-sleeve" }),
    knex('tags').insert({ category: "style", content: "hoodie" }),
    knex('tags').insert({ category: "style", content: "jacket" }),
    knex('tags').insert({ category: "style", content: "collared" }),
    knex('tags').insert({ category: "style", content: "dress" }),
    knex('tags').insert({ category: "style", content: "strapless" }),

    knex('tags').insert({ category: "material", content: "fabric" }),
    knex('tags').insert({ category: "material", content: "wool" }),
    knex('tags').insert({ category: "material", content: "silk" }),
    knex('tags').insert({ category: "material", content: "cotton" }),
    knex('tags').insert({ category: "material", content: "leather" }),
    knex('tags').insert({ category: "material", content: "denim" }),
    knex('tags').insert({ category: "material", content: "fur" }),


    knex('tags').orderBy('id')
  ]);
};