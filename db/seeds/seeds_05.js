// let seeds = [];


// exports.seed = function(knex, Promise) {

//   function populateSeeds () {
//     seeds.push(knex.raw("ALTER SEQUENCE items_id_seq RESTART WITH 1;"));
//     for (let i = 0; i < 5; i++) {
//       seeds.push(knex('items').insert({
//         type: "shoes",
//         size: `${i + 8}`,
//         image: `../../public/images/shoes/${i}/.jpg`,
//         description: `../../public/images/shoes/${i}/.jpg`,
//         user_id: i + 1
//       }));
//     }
//   }

//   populateSeeds();

//   return knex('items').del()
//     .then(function () {
//       return Promise.all(
//         seeds
//       );
//     });
// };


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return function () {
      return Promise.all([
        // Inserts seed entries
        // knex.raw("ALTER SEQUENCE items_id_seq RESTART WITH 1;"),
        knex('items').insert({ type: "shoes", size: "1", image: "img_link_1", description: "description 1", user_id: 1 }),
        knex('items').insert({ type: "shoes", size: "2", image: "img_link_2", description: "description 2", user_id: 2 }),
        knex('items').insert({ type: "shoes", size: "3", image: "img_link_3", description: "description 3", user_id: 3 })
      ]);
    };
};