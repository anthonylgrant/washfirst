// dbConfig = {
//   "user": "development",
//   "password": "development",
//   "database": "wash_first_dev_behzad",
//   "host": "localhost",
//   "port": 5432,
//   "ssl": true
// }

// let itemResults = [];

// const knex = require('knex')({
//   client: 'pg',
//   connection: dbConfig
// });


// getUserPreferences = (userInfo, currentUserBool, target_id, matchedItemIndex) => {
//   knex('tags').innerJoin('tag_user', 'tag_id', 'tags.id')
//               .where('user_id', userInfo.id)
//               .asCallback((err, rows) => {
//     if (err) throw err;
//     if (currentUserBool) {
//       tsquerify(rows, 'content', userInfo, matchItemsToCurrUserPreferences, target_id, matchedItemIndex);
//     }
//     else {
//       tsquerify(rows, 'content', userInfo, matchPreferencesToCurrUserItems, target_id, matchedItemIndex);
//     }
//   });
// }


// matchItemsToCurrUserPreferences = (tsquery, limit, userInfo, target_id, matchedItemIndex) => {
//   knex.raw(`SELECT id, user_id, type, gender, size, tsv, description, img_url, ts_rank(to_tsvector(tsv), to_tsquery('${tsquery}')) AS item_matching_my_preference
//     FROM items
//     WHERE (to_tsvector(tsv) @@ to_tsquery('${tsquery}'))
//     AND (user_id != ${userInfo.id} and type = '${userInfo.type}' and gender = '${userInfo.gender}' and size between ${userInfo.min_size} and ${userInfo.max_size})
//     ORDER BY item_matching_my_preference DESC;`).asCallback((err, rows) => {
//     if (err) throw err;
//     results = rows.rows.slice(0, limit);
//     getSelleInfo(results, userInfo.id);
//   });
// }


// matchPreferencesToCurrUserItems = (tsquery, limit, userInfo, target_id, matchedItemIndex) => {
//   knex.raw(`SELECT id, user_id, type, gender, size, tsv, ts_rank(to_tsvector(tsv), to_tsquery('${tsquery}')) AS preference_matching_my_items
//     FROM items
//     WHERE (to_tsvector(tsv) @@ to_tsquery('${tsquery}'))
//     AND (user_id = ${target_id} and type = '${userInfo.type}' and gender = '${userInfo.gender}' and size between ${userInfo.min_size} and ${userInfo.max_size})
//     ORDER BY preference_matching_my_items DESC;`).asCallback((err, rows) => {
//     if (err) throw err;
//     results = rows.rows.slice(0, limit);
//     getFinalRanking(results, target_id, matchedItemIndex);
//   });
// }


// let index = 0;
// getSelleInfo = (resultsArr, user_id) => {
//   if (index < resultsArr.length) {
//     knex('users').select().where('id', resultsArr[index].user_id).asCallback((err, rows) => {
//       if (err) throw err;
//       let seller = rows[0];
//       resultsArr[index]['seller'] = seller;
//       delete resultsArr[index].user_id;
//       index++;
//       getSelleInfo(resultsArr, user_id);
//     });
//   } else {
//     index = 0;
//     itemResults = resultsArr;
//     itemResults.forEach((item, index) => {
//       getUserPreferences(item.seller, false, user_id, index);
//     });
//   }
// }


// getFinalRanking = (resultsArr, user_id, matchedItemIndex) => {
//   itemResults[matchedItemIndex].sellersInterestInMyItems = resultsArr;
//   index++;
//   if (index === itemResults.length) {

//     itemResults.forEach((item) => {
//       calculateOverallRanking(item);
//     });

//     itemResults.sort((item1, item2) => {
//       return item2.overAllRanking - item1.overAllRanking;
//     });

//     console.log("Items recommended to the current user: \n ", itemResults, "\n \n");
//     console.log("example of sellersInterestInMyItems: \n ", itemResults[0].sellersInterestInMyItems, "\n \n");
//   }
// }


// getAvailableTags = (cb) => {
//   knex('tags').select().asCallback((err, rows) => {
//     if (err) throw err;
//     cb(rows);
//   });
// }


// getTagsPerItem = (item_id, cb) => {
//   knex('tags').innerJoin('item_tag', 'tag_id', 'tags.id')
//               .where('item_id', item_id)
//               .asCallback((err, rows) => {
//     if (err) throw err;
//     cb(rows);
//   });
// }


// getItemsPerUser = (user_id, cb) => {
//   knex('items').select().where('user_id', user_id).asCallback((err, rows) => {
//     if (err) throw err;
//     cb(rows);
//   });
// }


// getAvailableInventory = (curr_user_id, type, min_size, max_size, cb) => {
//   knex('items').select()
//               .whereNot('user_id', curr_user_id)
//               .where('type', type)
//               .where('gender', gender)
//               .whereBetween('size', [min_size, max_size])
//               .asCallback((err, rows) => {
//     if (err) throw err;
//     cb(rows);
//   });
// }


// tsquerify = (array, key, userInfo, cb, target_id, matchedItemIndex) => {
//   let arrString = array.map(function(element) {
//     return element[key];
//   }).join (" | ");
//   cb(arrString, 100, userInfo, target_id, matchedItemIndex);
// }


// findObjectInArrByKey = (objArr, key, value) => {
//   findObjects = (obj) => {
//     return obj[key] === value;
//   }
//   let x = objArr.find(findObjects);

//   console.log(x);
// }


// calculateOverallRanking = (item) => {
//   let match1 = item.item_matching_my_preference;
//   let match2 = item.sellersInterestInMyItems[0] ? item.sellersInterestInMyItems[0].preference_matching_my_items : 0.01;
//   item.overAllRanking = match1 * match2 * 10000;
// }


// defaultCallBack = (rows) => {
//   console.log(rows);
// }


// let userInfo = {
//   id: 1,
//   gender: 'male',
//   type: 'tops',
//   min_size: 0,
//   max_size: 2000
// }

// getUserPreferences(userInfo, true);
