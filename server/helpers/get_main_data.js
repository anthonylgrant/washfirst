const getMainData = (res, knex, user_id) => {
  const Promise = require('bluebird');
  const util = require('util');

  let currUserInfo;

  let inventory = {};

  let allTags;

  const getUserPreferences = (userInfo) => new Promise((resolve, reject) => {
    knex('tags').select('content').innerJoin('tag_user', 'tag_id', 'tags.id')
                .where('user_id', userInfo.id)
                .asCallback((err, rows) => {
      if (err) {
        console.log(err);
        reject("inside getUserPreferences");
      } else {
        userInfo.preferences = rows.map((tag) => { return tag.content; });
        userInfo.preferences.sort();
        resolve();
      }
    });
  });


  const getCurrUsersItems = (userInfo) => new Promise((resolve, reject) => {

    knex('items').select().where('user_id', userInfo.id).andWhere('type', 'tops').then((rows) => {
      userInfo.myItems.tops = rows;
      knex('items').select().where('user_id', userInfo.id).andWhere('type', 'bottoms').then((rows) => {
        userInfo.myItems.bottoms = rows;
        knex('items').select().where('user_id', userInfo.id).andWhere('type', 'shoes').then((rows) => {
          userInfo.myItems.shoes = rows;
          resolve();
        });
      });
    }).catch((err) => {
      console.log(err);
      reject("inside getCurrUsersItems");
    });
  });


  const getInventory = (userInfo, type, min_size, max_size) => new Promise((resolve, reject) => {
    knex('items').select()
                .whereNot('user_id', userInfo.id)
                .where('gender', userInfo.gender)
                .where('type', type)
                .whereBetween('size', [min_size, max_size])
                .asCallback((err, rows) => {
      if (err) {
        console.log(err);
        reject("inside getInventory");
      } else {
        switch(type) {
          case "tops":
            inventory.tops = rows;
            break;
          case "bottoms":
            inventory.bottoms = rows;
            break;
          case "shoes":
            inventory.shoes = rows;
            break;
          default:
            reject("inside getInventory - no case in switch case");
        };
        resolve();
      }
    });
  });


  const getItemTags = (itemInfo) => new Promise((resolve, reject) => {
    knex('tags').innerJoin('item_tag', 'tag_id', 'tags.id')
                .where('item_id', itemInfo.id)
                .asCallback((err, rows) => {
      if (err) {
        console.log(err);
        reject("inside getItemTags");
      } else {
        let itemTagArr = rows.map((tag) => {
          return tag.content;
        });
        itemInfo.tags = itemTagArr;
        resolve();
      }
    });
  });


  const getItemOwners = (itemInfo) => new Promise((resolve, reject) => {
    knex('users').where('id', itemInfo.user_id).then((rows) => {
      itemInfo.owner = rows[0];
      getUserPreferences(itemInfo.owner).then(() => {
        resolve();
      });
    }).catch((err) => {
      console.log(err);
      reject("inside getItemOwners");
    });
  });


  const getAllTags = () => new Promise((resolve, reject) => {
    knex('tags').select('content').asCallback((err, rows) => {
      if (err) {
        console.log(err);
        reject("inside getAllTags");
      } else {
        allTags = rows.map((tag) => {
          return tag.content;
        });
        allTags.sort();
        resolve();
      }
    });
  });


  const compareArrays = (userInfo, inventoryArr) => {

    inventoryArr.forEach((item) => {

      let p = new Set(userInfo.preferences);
      let iT = new Set(item.tags);

      const numOfPreferences = p.size;
      const numOfItemTags = iT.size;
      let overlap = 0;

      if (!numOfPreferences) {
          item.currUserWantsThis = 0;
      } else {
        p.forEach((tag) => {
          iT.has(tag) ? overlap++ : null;
        });
        const matchValue = overlap / numOfPreferences;
        item.currUserWantsThis = matchValue;
      }
    });

  }


  const findSellersInterestInMyProducts = (sellerInfo, myInventory) => {
    sellerInfo.sellersInterestInMyProduct = sellerInfo.sellersInterestInMyProduct || [];
    myInventory.forEach((item) => {
      let p = new Set(sellerInfo.preferences);
      let iT = new Set(item.tags);

      const numOfPreferences = p.size;
      const numOfItemTags = iT.size;
      let overlap = 0;
      let sellerInterest = {};
      let type = item.type.slice(0, -1);
      let min_size = `min_${type}_size`;
      let max_size = `max_${type}_size`;

      if (!numOfPreferences ||
        item.gender !== sellerInfo.gender ||
        item.size < sellerInfo[min_size] ||
        item.size > sellerInfo[max_size]) {
        sellerInterest[item.id] = 0;
        sellerInfo.sellersInterestInMyProduct.push(sellerInterest);
      } else {
        p.forEach((tag) => {
          iT.has(tag) ? overlap++ : null;
        });

        const matchValue = overlap / numOfPreferences;
        sellerInterest[item.id] = matchValue;
        sellerInfo.sellersInterestInMyProduct.push(sellerInterest);
      }

    });
  }

  knex('users').where('id', user_id).then((rows) => {
    currUserInfo = rows[0];
    currUserInfo.myItems = {};
  }).then(() => {

    Promise.all([

      getUserPreferences(currUserInfo),
      getCurrUsersItems(currUserInfo),
      getInventory(currUserInfo, 'tops', currUserInfo.min_top_size, currUserInfo.max_top_size),
      getInventory(currUserInfo, 'bottoms', currUserInfo.min_bottom_size, currUserInfo.max_bottom_size),
      getInventory(currUserInfo, 'shoes', currUserInfo.min_shoe_size, currUserInfo.max_shoe_size),
      getAllTags()

    ]).then(() => {
      let itemsPromiseArr = [];

      inventory.tops.forEach((top) => {
        itemsPromiseArr.push(getItemTags(top));
        itemsPromiseArr.push(getItemOwners(top));
      });

      inventory.bottoms.forEach((bottom) => {
        itemsPromiseArr.push(getItemTags(bottom));
        itemsPromiseArr.push(getItemOwners(bottom));
      });

      inventory.shoes.forEach((shoe) => {
        itemsPromiseArr.push(getItemTags(shoe));
        itemsPromiseArr.push(getItemOwners(shoe));
      });

      currUserInfo.myItems.tops.forEach((top) => {
        itemsPromiseArr.push(getItemTags(top));
      });

      currUserInfo.myItems.bottoms.forEach((bottom) => {
        itemsPromiseArr.push(getItemTags(bottom));
      });

      currUserInfo.myItems.shoes.forEach((shoe) => {
        itemsPromiseArr.push(getItemTags(shoe));
      });

      Promise.all(itemsPromiseArr).then(() => {

        compareArrays(currUserInfo, inventory.tops);
        compareArrays(currUserInfo, inventory.bottoms);
        compareArrays(currUserInfo, inventory.shoes);

        inventory.tops.forEach((top) => {
          findSellersInterestInMyProducts(top.owner, currUserInfo.myItems.tops);
          findSellersInterestInMyProducts(top.owner, currUserInfo.myItems.bottoms);
          findSellersInterestInMyProducts(top.owner, currUserInfo.myItems.shoes);
        });

        inventory.bottoms.forEach((bottom) => {
          findSellersInterestInMyProducts(bottom.owner, currUserInfo.myItems.tops);
          findSellersInterestInMyProducts(bottom.owner, currUserInfo.myItems.bottoms);
          findSellersInterestInMyProducts(bottom.owner, currUserInfo.myItems.shoes);
        });

        inventory.shoes.forEach((shoe) => {
          findSellersInterestInMyProducts(shoe.owner, currUserInfo.myItems.tops);
          findSellersInterestInMyProducts(shoe.owner, currUserInfo.myItems.bottoms);
          findSellersInterestInMyProducts(shoe.owner, currUserInfo.myItems.shoes);
        });

        // console.log("current user: \n", util.inspect(currUserInfo, false, null), "\n \n");
        // console.log("------------------------------------------------------------");
        // console.log("\n \n total inventory size: ", inventory.tops.length + inventory.bottoms.length + inventory.shoes.length, "\n \n");
        // console.log("------------------------------------------------------------");
        // console.log("\n \n Inventory: \n", util.inspect(inventory.shoes, false, null), "\n \n");

        let outputData = {
          currUserInfo: currUserInfo,
          inventory: inventory,
          allTags: allTags
        }

        res.json(outputData);

      });
    });
  });
}

module.exports = getMainData;
