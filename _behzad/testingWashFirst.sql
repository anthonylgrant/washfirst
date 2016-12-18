DROP TABLE IF EXISTS tag_user;
DROP TABLE IF EXISTS item_tag;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users(
   ID integer PRIMARY KEY,
   gender varchar(250),
   type varchar(250),
   min_size integer,
   max_size integer
);

CREATE TABLE IF NOT EXISTS tags(
  ID SERIAL PRIMARY KEY,
  CONTENT VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS tag_user (
  ID SERIAL PRIMARY KEY,
  USER_ID integer REFERENCES users(id),
  TAG_ID integer REFERENCES tags(id)
);


CREATE TABLE IF NOT EXISTS items(
  ID SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id),
  type varchar(250),
  gender varchar(10),
  size integer,
  tsv varchar(1000)
);

CREATE TABLE IF NOT EXISTS item_tag(
  ID SERIAL PRIMARY KEY,
  item_id integer REFERENCES items(id),
  tag_id integer REFERENCES tags(id)
);


INSERT INTO users (id, gender, type, min_size, max_size) VALUES (1, 'male', 'tops', 0, 11100);
INSERT INTO users (id, gender, type, min_size, max_size) VALUES (2, 'male', 'tops', 0, 22200);
INSERT INTO users (id, gender, type, min_size, max_size) VALUES (3, 'male', 'tops', 0, 33300);

INSERT INTO tags (content) VALUES ('blue'); --1
INSERT INTO tags (content) VALUES ('red'); --2
INSERT INTO tags (content) VALUES ('green'); --3
INSERT INTO tags (content) VALUES ('white'); --4
INSERT INTO tags (content) VALUES ('black'); --5
INSERT INTO tags (content) VALUES ('orange'); --6

INSERT INTO tags (content) VALUES ('soccer'); --7
INSERT INTO tags (content) VALUES ('basketball'); --8

INSERT INTO tags (content) VALUES ('long-sleeve'); --9
INSERT INTO tags (content) VALUES ('short-sleeve'); --10

INSERT INTO tags (content) VALUES ('nike'); --11
INSERT INTO tags (content) VALUES ('adidas'); --12
INSERT INTO tags (content) VALUES ('new-balance'); --13
INSERT INTO tags (content) VALUES ('reebok'); --14
INSERT INTO tags (content) VALUES ('gucci'); --15



INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 1), (select id from tags where content='green'));
INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 1), (select id from tags where content='soccer'));
INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 1), (select id from tags where content='nike'));
INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 1), (select id from tags where content='short-sleeve'));

INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 2), (select id from tags where content='red'));
INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 2), (select id from tags where content='nike'));

INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='new-balance'));
INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='orange'));
INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='basketball'));



INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 1), 'tops', 'male', 1, 'black new-balance basketball');
INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 1), 'tops', 'male', 11, 'nike red soccer short-sleeve');

INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 2), 'tops', 'male', 111, 'green nike soccer long-sleeve');
INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 2), 'tops', 'female', 12, 'blue');
INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 2), 'tops', 'male', 22, 'black short-sleeve');

INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 3), 'tops', 'male', 111, 'nike soccer short-sleeve green');
INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 3), 'tops', 'female', 12, 'nike soccer short-sleeve green');
INSERT INTO items (user_id, type, gender, size, tsv) VALUES ((select id from users where id = 3), 'tops', 'male', 22, 'adidas orange basketball');



INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 1), (select id from tags where id = 5));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 1), (select id from tags where id = 13));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 1), (select id from tags where id = 8));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 2), (select id from tags where id = 11));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 2), (select id from tags where id = 2));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 2), (select id from tags where id = 7));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 2), (select id from tags where id = 10));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 3), (select id from tags where id = 3));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 3), (select id from tags where id = 14));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 3), (select id from tags where id = 7));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 3), (select id from tags where id = 9));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 4), (select id from tags where id = 1));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 5), (select id from tags where id = 5));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 5), (select id from tags where id = 10));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 6), (select id from tags where id = 11));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 6), (select id from tags where id = 7));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 6), (select id from tags where id = 10));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 6), (select id from tags where id = 3));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 7), (select id from tags where id = 11));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 7), (select id from tags where id = 7));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 7), (select id from tags where id = 10));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 7), (select id from tags where id = 3));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 8), (select id from tags where id = 12));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 8), (select id from tags where id = 6));
INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 8), (select id from tags where id = 8));



-- select content from tags join item_tag on tag_id = tags.id where item_id = 2;

-- SELECT * FROM items WHERE to_tsvector('english', tsv) @@ to_tsquery('english', 'blue & green');

-- SELECT * FROM items WHERE to_tsvector('english', tsv) @@ to_tsquery('english', 'dress');


-- SELECT id, ts_rank(to_tsvector(tsv), to_tsquery('blue | green')) AS rank
--     FROM items
--     WHERE to_tsvector(tsv) @@ to_tsquery('blue | green')
--     ORDER BY rank DESC;

-- select content from tags join tag_user on tag_id = tags.id where user_id = 1;

-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='green'));

-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='new-balance'));



-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='white'));

-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='reebok'));



-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='black'));

-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='gucci'));

-- select content from tags join tag_user on tag_id = tags.id where user_id != 1;