let users = [];

let genders = ['male', 'female'];

let maleTopSizes = [1, 2, 3, 4, 5, 6]; //xs, s, m, l, xl, xxl
let maleShoeSizes = [6, 7, 8, 9, 10, 11, 12, 13, 14];
let maleBottomSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // hash each legnth x waist combination into a number

let femaleTopSizes = [1, 2, 3, 4, 5, 6]; //xs, s, m, l, xl, xxl
let femaleShoeSizes = [6, 7, 8, 9, 10, 11, 12, 13, 14];
let femaleBottomSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // hash each legnth x waist combination into a number


randomUserIndex = (array, type) => {
  let output = [];
  if (type === 'gender') {
    output[0] = array[Math.floor(Math.random() * array.length)];
  } else {
    output[0] = array[Math.floor(Math.random() * array.length)];
    output[1] = array[Math.floor(Math.random() * array.length)];
    output.sort((a,b) => {return a-b;});
  }
  return output;
}


exports.seed = function(knex, Promise) {
  // for (let i = 0; i < 10; i++) {
  //   let gender = randomUserIndex(genders, 'gender');
  //   let topSizes = [];
  //   let shoeSizes = [];
  //   let bottomSizes = [];

  //   if (gender[0] === 'male') {
  //     topSizes = randomUserIndex(maleTopSizes, 'maleTops');
  //     shoeSizes = randomUserIndex(maleShoeSizes, 'maleShoes');
  //     bottomSizes = randomUserIndex(maleBottomSizes, 'maleBottoms');
  //   } else if (gender[0] === 'female') {
  //     topSizes = randomUserIndex(femaleTopSizes, 'femaleTops');
  //     shoeSizes = randomUserIndex(femaleShoeSizes, 'femaleShoes');
  //     bottomSizes = randomUserIndex(femaleBottomSizes, 'femaleBottoms');
  //   }


  //   users.push(knex('users').insert(
  //     {
  //       username: `user_${i}`,
  //       password: `password_${i}`,
  //       email: `email_${i}`,
  //       phone_number: `111-111-1${i}`,
  //       gender: gender[0],
  //       type: 'tops',
  //       min_top_size: topSizes[0],
  //       max_top_size: topSizes[1],
  //       min_size: topSizes[0],
  //       max_size: topSizes[1],
  //       min_shoe_size: shoeSizes[0],
  //       max_shoe_size: shoeSizes[1],
  //       min_bottom_size: bottomSizes[0],
  //       max_bottom_size: bottomSizes[1]
  //     })
  //   );
  // }

  // users.push(knex('users').orderBy('id'));

  // return Promise.all(users);

  return;

};
