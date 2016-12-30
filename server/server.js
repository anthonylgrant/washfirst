'use strict';
// +---------------------+
// |    DEPENDENCIES     |
// +---------------------+
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// const dbConfig = require('../server/db/config_local');
// const knex = require('knex')({
//   client: 'pg',
//   connection: dbConfig,
//   pool: {
//     min: 2,
//     max: 16
//   }
// });


// const bcrypt = require('bcrypt');
// const session = require('express-session');
const bcrypt = require('bcrypt');
const session = require('express-session');
// const engine = require('ejs-locals');

// HEROKU CONFIG GOES INTO .ENV FILE
const connection = require('./db/knexfile.js').development;
const knex = require('knex')(connection);

// +---------------------+
// |       HELPERS       |
// +---------------------+
const getTags = require('./helpers/get_tags.js');
const getResultsFromDb = require('../_behzad/query_simple');
const processUserQuery = require('../_behzad/process_user_query');
const createNewItem = require('../_behzad/create_new_item');
const insertUser = require('./helpers/add_user_to_db.js');
const editItemWithTags = require('../_behzad/edit_item.js');
const deleteItem = require('./helpers/delete_item.js');

  // VALIDATION
  // const validUsername;
  // const validPassword;
  // const validEmail;

// +---------------------+
// |     ROUTER          |
// +---------------------+



// +---------------------+
// |      BLACKLIST      |
// +---------------------+

const blacklist = [
  '/index',
  '/user/:id',
  '/api'
]


// +---------------------+
// |     MIDDLEWARE      |
// +---------------------+

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  // SECRET GOES INTO .ENV FILE
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(blacklist, (req, res, next) => {
if(req.session.username) {
    next();
  } else {
    const usernameError = false;
    const passwordError = false;
    res.render('pages/login', {
      usernameError: usernameError,
      passwordError: passwordError
    });
  }
});





// +---------------------+
// |     VIEW ENGINE     |
// +---------------------+

app.set('view engine', 'ejs');


// +---------------------+
// |        PORT         |
// +---------------------+

const PORT = process.env.PORT || 8080;


//          ToDO
    // -validate registration
    // -BlackList
    // -env files
    // -


// ***********************
// ***********************
// +---------------------+
// |       ROUTES        |
// +---------------------+
// ***********************
// ***********************

// ***********************
// ***********************
// +---------------------+
// |         GET         |
// +---------------------+

// +---------------------+
// |     INDEX/ITEMS     |
// +---------------------+

app.get('/api/login/check', (req, res) => {
  console.log('got called');
  console.log('req.session', req.session.username);
  if(!req.session.username) {
    console.log('no username');
    res.json({ status: false });
  } else {
    res.json({ status: true });
    console.log('username present');
  }
});

app.get('/api/', (req, res) => {
  getResultsFromDb(res, knex);
});




// +---------------------+
// |     USER'S PAGE     |
// +---------------------+

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // Passing back to view: user's items, user's sizes (editable)
  knex('items').select().where('user_id', 11).asCallback((err, rows) => {
    console.log("user 11's items rows: ", rows)
    const templateVars = { currentUserItems: rows, currentUsername: req.session.username };

    res.render('pages/user', templateVars)
  })
})




// +---------------------+
// |        LOGIN        |
// +---------------------+

app.get('/login', (req, res) => {
  const usernameError = false;
  const passwordError = false;
  res.render('pages/login', {
    usernameError: usernameError,
    passwordError: passwordError
  });
})


// +---------------------+
// |      REGISTER       |
// +---------------------+


app.get('/register', (req, res) => {
  res.render('pages/signup')
})


// ***********************
// ***********************
// +---------------------+
// |        POST         |
// +---------------------+

// +---------------------+
// |        LOGIN        |
// +---------------------+

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // username: nodemon, password: asdf = true
  if(!username || !password) {
    const usernameError = true;
    res.render('pages/login', {
      usernameError: usernameError
    });
    return;
  }

  knex('users')
    .count('id')
    .where('username', username)
  .then((string) => {
    console.log('string: ', string);
    const int = parseInt(string[0].count);
    console.log('int: ', int);
    if (int === 0) {
      console.log('in here');
      const usernameError = true;

      res.render('pages/login', {
        usernameError: usernameError
      });
    }
  })
  .then(() => {
    knex('users').select('password', 'id')
    .where('username', username)
    .then((user) => {
      console.log('user', user);
      if (user.length === 0) {
        return;
      }
      console.log('password', password);
      bcrypt.compare(password, user[0].password)
      .then((valid) => {
        console.log('valid: ', valid);
        if(valid) {
          console.log('inside bcrypt user: ', user)
          //### Initializes Session ###//
          req.session.username = username;
          req.session.userId = user[0].id;


          res.redirect('http://localhost:3000');
        } else {
          const usernameError = true;
          res.render('pages/login', {
            usernameError: usernameError
          });
        }
      });
    })
  });

});


// +---------------------+
// |      REGISTER       |
// +---------------------+

app.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10).then(function(hash) {
    const userObject = {
      username: req.body.username,
      password: hash,
      email: req.body.email,
      phone_number: req.body.phone,
      gender: req.body.gender,
      min_top_size: parseInt(req.body.min_top_size),
      max_top_size: parseInt(req.body.max_top_size),
      min_bottom_size: parseInt(req.body.min_bottom_size),
      max_bottom_size: parseInt(req.body.max_bottom_size),
      min_shoe_size: parseInt(req.body.min_shoe_size),
      max_shoe_size: parseInt(req.body.max_shoe_size)
    }


    insertUser(userObject);
    res.redirect('http://localhost:3000');
  })
});


// +---------------------+
// |      NEW ITEM       |
// +---------------------+

app.post('/users/:id/new', (req, res) => {
  let currentUserId = req.session.userId;

  let itemTags = req.body.tags.split(' ');
  let dataTemplate = {
    gender: req.body.gender,
    type: req.body.type,
    size: Number(req.body.size),
    description: req.body.description,
    tags: itemTags,
    img_url: req.body.imageurl,
    user_id: currentUserId
  }
  console.log(dataTemplate);

  createNewItem(dataTemplate, knex);
  res.redirect('/users/:id');
});


// ***********************
// ***********************
// +---------------------+
// |        PUT          |
// +---------------------+

// +---------------------+
// |        LOGOUT       |
// +---------------------+

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('http://localhost:3000');
});


// ***********************
// ***********************
// +---------------------+
// |       UPDATE        |
// +---------------------+

// +---------------------+
// |        ITEM         |
// +---------------------+

app.get('/users/:username/items/:id', (req, res) => {
  knex('items').select().where('id', req.params.id).asCallback((err, rows) => {
    if (err) throw err;
    knex('tags').select('tags.content').join('item_tag', 'item_tag.tag_id', 'tags.id').where('item_id', rows[0].id).asCallback((err, tags) => {
      if (err) throw err;
      let currentItemTags = "";
      tags.forEach((tag) => {
        currentItemTags += (tag.content + ' ');
      })
      let templateVars = {
        id: req.params.id,
        currentItem: rows,
        currentItemTags: currentItemTags,
        currentUsername: req.session.username
      }
      console.log("templateVars: ", templateVars);
      res.render('pages/item_edit', templateVars)
    });
  });
});

app.post('/users/:username/items/:id', (req, res) => {
  // console.log("wasssup you are here");
  // console.log("req.body", req.body)
  editItemWithTags(req, res, knex);
});



// ***********************
// ***********************
// +---------------------+
// |       DELETE        |
// +---------------------+

// +---------------------+
// |        ITEM         |
// +---------------------+




app.delete('/api/items/:id', (req, res) => {
  deleteItem(req.params.id);
  getResultsFromDb(res, knex);
});

// ***********************
// ***********************
// +---------------------+
// |       LISTEN        |
// +---------------------+
// ***********************
// ***********************

app.listen(PORT, () => {
  console.log('listening to http://localhost:' + PORT);
});







app.post('/api', (req, res) => {
  processUserQuery(req, res, knex);
});
