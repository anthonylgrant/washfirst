// let colorTags = ["blue", "red", "green", "white", "black", "orange", "yellow", "grey"];
// let otherTags = ["soccer", "basketball"];
// let styleTags = ["shirt", "t-shirt", "short-sleeve", "long-sleeve", "hoodie", "jacket", "collared", "dress", "strapless"];
// let materialTags = ["fabric", "wool", "silk", "cotton", "leather", "denim", "fur"];
// let brandTags = ["nike", "adidas", "new-balance", "reebok", "gucci", "guess", "gap"];

let colorTags = [1, 2, 3, 4, 5, 6, 7, 8];
let otherTags = [9, 10];
let styleTags = [11, 12, 13, 14, 15, 16, 17, 18, 19];
let materialTags = [20, 21, 22, 23, 24, 25, 26];
let brandTags = [27, 28, 29, 30, 31, 32, 33];

let items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
let itemTagArr = [];

exports.seed = function(knex, Promise) {

  randomItemForItemTag = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomTagForItemTag = (array, item_id, itemTagArr) => {
    let numberOfTagsFromThisArr = Math.floor(Math.random() * array.length);
    let tags = new Set();

    for (let i = 0; i < numberOfTagsFromThisArr; i++) {
      tags.add(array[Math.floor(Math.random() * array.length)]);
    }

    tags.forEach((tag_id) => {
      itemTagArr.push(knex('item_tag').insert(
        {
          tag_id: tag_id,
          item_id: item_id
        })
      );
    });
  }

  items.forEach((item_id) => {
    randomTagForItemTag(colorTags, item_id, itemTagArr);
    randomTagForItemTag(otherTags, item_id, itemTagArr);
    randomTagForItemTag(styleTags, item_id, itemTagArr);
    randomTagForItemTag(materialTags, item_id, itemTagArr);
    randomTagForItemTag(brandTags, item_id, itemTagArr);
  });

  itemTagArr.push(knex('item_tag').orderBy('id'));

  return Promise.all(
    itemTagArr
  );
};
