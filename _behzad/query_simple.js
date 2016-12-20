const Promise = require('bluebird');
const util = require('util');

const dbConfig = require('../db/config_heroku');
const knex = require('knex')({
  client: 'pg',
  connection: dbConfig,
  pool: {
      min: 2,
      max: 10
    }
});

let currUserInfo = {
  id: 1,
  gender: 'male',
  myItems: {}
}

let inventory = {};


getUserPreferences = (userInfo) => new Promise((resolve, reject) => {
  knex('tags').select('content').innerJoin('tag_user', 'tag_id', 'tags.id')
              .where('user_id', userInfo.id)
              .asCallback((err, rows) => {
    if (err) {
      reject();
    } else {
      userInfo.preferences = rows.map((tag) => { return tag.content; });
      resolve();
    }
  });
});


getCurrUsersItems = (userInfo) => new Promise((resolve, reject) => {
  knex('items').select().where('user_id', userInfo.id).andWhere('type', 'tops').then((rows) => {
    userInfo.myItems.tops = rows;
    knex('items').select().where('user_id', userInfo.id).andWhere('type', 'bottoms').then((rows) => {
      userInfo.myItems.bottoms = rows;
      knex('items').select().where('user_id', userInfo.id).andWhere('type', 'shoes').then((rows) => {
        userInfo.myItems.shoes = rows;
        resolve();
      });
    });
  }).catch((err) => { reject(); });
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
          inventory.tops = rows;
          break;
        case "bottoms":
          inventory.bottoms = rows;
          break;
        case "shoes":
          inventory.shoes = rows;
          break;
        default:
          reject();
      };
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


getItemOwners = (itemInfo) => new Promise((resolve, reject) => {
  knex('users').where('id', itemInfo.user_id).then((rows) => {
    itemInfo.owner = rows[0];
    // delete itemInfo.user_id;
    getUserPreferences(itemInfo.owner).then(() => {
      resolve();
    });
  }).catch((err) => { reject(); });
});


// compareArrays = (userInfo, inventoryArr, findThisSellersInterest) => {

//   inventoryArr.forEach((item) => {
//     if (findThisSellersInterest) { item.sellersInterest = item.sellersInterest || []; }

//     let p = new Set(userInfo.preferences);
//     let iT = new Set(item.tags);

//     const numOfPreferences = p.size;
//     const numOfItemTags = iT.size;
//     let overlap = 0;

//     if(numOfPreferences === 0) {
//       if (findThisSellersInterest) {
//         let sellerInterest = {};
//         sellerInterest[userInfo.id] = 0;
//         item.sellersInterest.push(sellerInterest);
//       } else {
//         item.currUserWantsThis = 0;
//       }
//       return 0;
//     }

//     p.forEach((tag) => {
//       iT.has(tag) ? overlap++ : null;
//     });

//     const matchValue = overlap / numOfPreferences;

//     if (findThisSellersInterest) {
//       let sellerInterest = {};
//       sellerInterest[userInfo.id] = matchValue;
//       item.sellersInterest.push(sellerInterest);
//     } else {
//       item.currUserWantsThis = matchValue;
//     }

//   });

// }


compareArrays = (userInfo, inventoryArr, findThisSellersInterest) => {

  inventoryArr.forEach((item) => {
    if (findThisSellersInterest) { userInfo.sellersInterestInMyProduct = userInfo.sellersInterestInMyProduct || []; }

    let p = new Set(userInfo.preferences);
    let iT = new Set(item.tags);

    const numOfPreferences = p.size;
    const numOfItemTags = iT.size;
    let overlap = 0;

    if(numOfPreferences === 0) {
      if (findThisSellersInterest) {
        let sellerInterest = {};
        sellerInterest[item.id] = 0;
        userInfo.sellersInterestInMyProduct.push(sellerInterest);
      } else {
        item.currUserWantsThis = 0;
      }
      return 0;
    }

    p.forEach((tag) => {
      iT.has(tag) ? overlap++ : null;
    });

    const matchValue = overlap / numOfPreferences;

    if (findThisSellersInterest) {
      let sellerInterest = {};
      sellerInterest[item.id] = matchValue;
      userInfo.sellersInterestInMyProduct.push(sellerInterest);
    } else {
      item.currUserWantsThis = matchValue;
    }

  });

}


Promise.all([

  getUserPreferences(currUserInfo),
  getCurrUsersItems(currUserInfo),
  getInventory(currUserInfo, 'tops', 3, 6),
  getInventory(currUserInfo, 'bottoms', 3, 10),
  getInventory(currUserInfo, 'shoes', 7, 12)

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
      compareArrays(top.owner, currUserInfo.myItems.tops, top.owner);
      compareArrays(top.owner, currUserInfo.myItems.bottoms, top.owner);
      compareArrays(top.owner, currUserInfo.myItems.shoes, top.owner);
      // top.overallRating = top.currUserWantsThis * top.owner.currUserHasWhatIwant * 100;
    });

    inventory.bottoms.forEach((bottom) => {
      compareArrays(bottom.owner, currUserInfo.myItems.tops, bottom.owner);
      compareArrays(bottom.owner, currUserInfo.myItems.bottoms, bottom.owner);
      compareArrays(bottom.owner, currUserInfo.myItems.shoes, bottom.owner);
      // bottom.overallRating = bottom.currUserWantsThis * bottom.owner.currUserHasWhatIwant;
    });

    inventory.shoes.forEach((shoe) => {
      compareArrays(shoe.owner, currUserInfo.myItems.tops, shoe.owner);
      compareArrays(shoe.owner, currUserInfo.myItems.bottoms, shoe.owner);
      compareArrays(shoe.owner, currUserInfo.myItems.shoes, shoe.owner);
      // shoe.overallRating = shoe.currUserWantsThis * shoe.owner.currUserHasWhatIwant * 100;
    });


    // inventory.tops.sort((a, b) => {
    //   return b.overallRating - a.overallRating;
    // });

    // inventory.bottoms.sort((a, b) => {
    //   return b.overallRating - a.overallRating;
    // });

    // inventory.shoes.sort((a, b) => {
    //   return b.overallRating - a.overallRating;
    // });


    console.log("current user: \n", util.inspect(currUserInfo, false, null), "\n \n");
    console.log("------------------------------------------------------------");
    console.log("\n \n total inventory size: ", inventory.tops.length + inventory.bottoms.length + inventory.shoes.length, "\n \n");
    console.log("------------------------------------------------------------");
    console.log("\n \n Inventory: \n", util.inspect(inventory, false, null), "\n \n");

    // console.log("example of myItems.tops[0].sellersInterest: \n:", currUserInfo.myItems.tops[0].sellersInterest);
  });
});

// findObjectInArrByKey = (objArr, key, value) => {
//   findObjects = (obj) => {
//     return Object.keys(obj.sellersInterest)[0] == value
//   }
//   let x = objArr.find(findObjects);
//   console.log(x);
// }


