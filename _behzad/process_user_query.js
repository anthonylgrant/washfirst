// const getResultsFromDb = require('./query_simple');

// const changeUserPreferences = (req, res, knex) => {

//   let userPreferences = JSON.parse(req.body.data);

//   const addOrUpdateTag = (tag, user_id) => new Promise((resolve, reject) => {
//     knex('tag_user').where('user_id', user_id).del().then(() => {
//       knex('tags').insert({content: tag}).returning('id').asCallback((err, id) => {
//       if (id) {
//         knex('tag_user').insert({tag_id: id[0], user_id: user_id}).asCallback((err, rows) => {
//           if (err) { reject(); }
//           else { resolve(); }
//         });
//       } else {
//         knex('tags').select('id').where('content', tag).asCallback((err, rows) => {
//           if (err) { reject(); }
//           else {
//             console.log("IT EXISTS: ", rows, tag);
//             tag_id = rows[0].id;

//             knex('tag_user').insert({'tag_id': tag_id, 'user_id': user_id}).asCallback((err, rows) => {
//               if (err) { reject(); }
//               else { resolve(); }
//             });
//           }
//         });
//       };
//     });
//   });
// });

//   let promiseArr = [];

//   userPreferences.forEach((tag) => {
//     promiseArr.push(addOrUpdateTag(tag, 5));
//   });

//   Promise.all(promiseArr).then(() => {
//     getResultsFromDb(res, knex);
//   });

// }

// module.exports = changeUserPreferences;
