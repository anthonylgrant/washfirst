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

let users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let tagUserArr = [];

exports.seed = function(knex, Promise) {

  randomUserForTagUser = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }

  randomTagForTagUser = (array, user_id, tagUserArr) => {
    let numberOfTagsFromThisArr = Math.floor(Math.random() * array.length);
    let tags = new Set();

    for (let i = 0; i < numberOfTagsFromThisArr; i++) {
      tags.add(array[Math.floor(Math.random() * array.length)]);
    }

    tags.forEach((tag_id) => {
      tagUserArr.push(knex('tag_user').insert(
        {
          tag_id: tag_id,
          user_id: user_id
        })
      );
    });
  }

  users.forEach((user_id) => {
    randomTagForTagUser(colorTags, user_id, tagUserArr);
    randomTagForTagUser(otherTags, user_id, tagUserArr);
    randomTagForTagUser(styleTags, user_id, tagUserArr);
    randomTagForTagUser(materialTags, user_id, tagUserArr);
    randomTagForTagUser(brandTags, user_id, tagUserArr);
  });

  tagUserArr.push(knex('tag_user').orderBy('id'));

  return Promise.all(
    tagUserArr
  );
};




