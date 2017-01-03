let items = [];

let genders = ['male', 'female'];

let maleTopSizes = [1, 2, 3, 4, 5, 6]; //xs, s, m, l, xl, xxl
let maleShoeSizes = [6, 7, 8, 9, 10, 11, 12, 13, 14];
let maleBottomSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // hash each legnth x waist combination into a number

let femaleTopSizes = [1, 2, 3, 4, 5, 6]; //xs, s, m, l, xl, xxl
let femaleShoeSizes = [6, 7, 8, 9, 10, 11, 12, 13, 14];
let femaleBottomSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // hash each legnth x waist combination into a number


randomItemIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

exports.seed = function(knex, Promise) {
  // for (let i = 0; i < 10; i++) {
  //   let gender = randomItemIndex(genders);
  //   items.push(knex('items').insert(
  //     {
  //       type: "shoes",
  //       gender: gender,
  //       size: (gender === 'male') ? randomItemIndex(maleShoeSizes) : randomItemIndex(femaleShoeSizes),
  //       img_url: "../../public/images/default-shoe-img.jpeg",
  //       description: `description_blah_blah_${i}`,
  //       user_id: i + 1
  //     })
  //   );
  // }

  // for (let i = 0; i < 10; i++) {
  //   let gender = randomItemIndex(genders);
  //   items.push(knex('items').insert(
  //     {
  //       type: "tops",
  //       gender: gender,
  //       size: (gender === 'male') ? randomItemIndex(maleTopSizes) : randomItemIndex(femaleTopSizes),
  //       img_url: "../../public/images/default-top-img.jpg",
  //       description: `description_blah_blah_${i}`,
  //       user_id: i + 1
  //     })
  //   );
  // }

  // for (let i = 0; i < 10; i++) {
  //   let gender = randomItemIndex(genders);
  //   items.push(knex('items').insert(
  //     {
  //       type: "bottoms",
  //       gender: gender,
  //       size: (gender === 'male') ? randomItemIndex(maleBottomSizes) : randomItemIndex(femaleBottomSizes),
  //       img_url: "../../public/images/default-bottom-img.png",
  //       description: `description_blah_blah_${i}`,
  //       user_id: i + 1
  //     })
  //   );
  // }


  // items.push(knex('items').orderBy('id'));

  // return Promise.all(items);

  return;
};
