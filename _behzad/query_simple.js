const Promise = require('bluebird');

const dbConfig = require('../db/config_heroku');
const knex = require('knex')({
  client: 'pg',
  connection: dbConfig,
  pool: {
      min: 2,
      max: 10
    }
});

let userInfo = {
  id: 1,
  gender: 'male'
}

let userTagArr, topsInventoryArr, bottomsInventoryArr, shoesInventoryArr;

getUserPreferences = (userInfo) => new Promise((resolve, reject) => {
  knex('tags').select('content').innerJoin('tag_user', 'tag_id', 'tags.id')
              .where('user_id', userInfo.id)
              .asCallback((err, rows) => {
    if (err) {
      reject();
    } else {
      userTagArr = rows.map((tag) => { return tag.content; });
      resolve();
    }
  });
});


getItemTags = (itemInfo) => new Promise((resolve, reject) => {
  knex('tags').innerJoin('item_tag', 'tag_id', 'tags.id')
              .where('item_id', itemInfo.id)
              .asCallback((err, rows) => {
    if (err) {
      reject();
    } else {
      let itemTagArr = rows.map((tag) => {
        return tag.content;
      });
      itemInfo.tags = itemTagArr;
      resolve();
    }
  });
});



getInventory = (userInfo, type, min_size, max_size) => new Promise((resolve, reject) => {
  knex('items').select()
              .whereNot('user_id', userInfo.id)
              .where('gender', userInfo.gender)
              .where('type', type)
              .whereBetween('size', [min_size, max_size])
              .asCallback((err, rows) => {
    if (err) {
      reject();
    } else {
      switch(type) {
        case "tops":
          topsInventoryArr = rows;
          break;
        case "bottoms":
          bottomsInventoryArr = rows;
          break;
        case "shoes":
          shoesInventoryArr = rows;
          break;
        default:
          reject();
      };
      resolve();
    }
  });
});

Promise.all([

  getUserPreferences(userInfo, userTagArr),
  getInventory(userInfo, 'tops', 3, 6, topsInventoryArr),
  getInventory(userInfo, 'bottoms', 3, 10, bottomsInventoryArr),
  getInventory(userInfo, 'shoes', 7, 12, shoesInventoryArr)


]).then(() => {
  let itemTagsPromiseArr = [];

  topsInventoryArr.forEach((top) => {
    itemTagsPromiseArr.push(getItemTags(top));
  });

  bottomsInventoryArr.forEach((bottom) => {
    itemTagsPromiseArr.push(getItemTags(bottom));
  });

  shoesInventoryArr.forEach((shoe) => {
    itemTagsPromiseArr.push(getItemTags(shoe));
  });

  Promise.all(itemTagsPromiseArr).then(() => {
    console.log("user preference: \n", userTagArr, "\n");
    console.log("items matching user's gender and top size are: \n", topsInventoryArr, "\n");
    console.log("items matching user's gender and bottom size are: \n", bottomsInventoryArr, "\n");
    console.log("items matching user's gender and shoe size are: \n", shoesInventoryArr, "\n");
  });

});
