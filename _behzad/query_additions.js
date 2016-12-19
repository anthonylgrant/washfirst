const dbConfig = require('../db/config');
const knex = require('knex')({
  client: 'pg',
  connection: dbConfig,
  pool: {
      min: 2,
      max: 10
    }
});


addUserToDb = (newUserInfo) => {
  knex('users').insert(newUserInfo).asCallback((err, rows) => {
    if (err) throw err;
    console.log(`New user ${newUserInfo.username} was successfully added to database`);
  });
}

addItemToDb = (newItemInfo) => {
  knex('items').insert(newItemInfo).asCallback((err, rows) => {
    if(err) throw err;
    let tags = newItemInfo.tsv.split(/[ ,]+/);
    tags.forEach((tag) => {
      knex('tags').select('id').where('content', tag).asCallback((err, rows) => {
        if (err) throw err;
        item_tag_info = {
          item_id: 31,
          tag_id: rows[0].id
        };
        knex('item_tag').insert(item_tag_info).asCallback((err, rows) => {
          if (err) throw err;
          console.log(`item ${newItemInfo} was added successfully to databse.`);
        });
      });
    });
  });
}


addNewUserPreferences = (newPreferenceInfo) => {
  let tags = newPreferenceInfo.tags.split(/[ ,]+/);
  tags.forEach((tag) => {
    knex('tags').select('id').where('content', tag).asCallback((err, rows) => {
      if (err) throw err;
      tag_user_info = {
        user_id: newPreferenceInfo.user_id,
        tag_id: rows[0].id
      };
      knex('tag_user').insert(tag_user_info).asCallback((err, rows) => {
        if (err) throw err;
        console.log(`user preference ${newPreferenceInfo} was added successfully to database.`);
      });
    });
  });
}

let newUserInfo = {
  username: 'Behzad',
  password: 'behzadsPw',
  email: 'behzadsEmail',
  phone_number: '778-837-6597',
  gender: 'male',
  type: 'tops',
  min_top_size: 1,
  max_top_size: 2,
  min_size: 1,
  max_size: 5,
  min_shoe_size: 8,
  max_shoe_size: 9,
  min_bottom_size: 4,
  max_bottom_size: 5,
};

let newPreferenceInfo = {
  user_id: 11,
  tags: 'wool leather fur yellow basketball reebok strapless white oragne green'
};

let newItemInfo = {
  type: 'tops',
  gender: 'female',
  size: '4',
  description: 'intentional match',
  img_url: 'someImg.png',
  user_id: 11,
  tsv: 'white fabric soccer dress jacket shirt hoodie black blue green long-sleeve oragne'
}

// addUserToDb(newUserInfo);
// addItemToDb(newItemInfo);
addNewUserPreferences(newPreferenceInfo);
