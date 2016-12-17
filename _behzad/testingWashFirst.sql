DROP TABLE IF EXISTS tag_user;
DROP TABLE IF EXISTS item_tag;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS users;


CREATE TABLE IF NOT EXISTS users(
   ID integer PRIMARY KEY
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
  tsv varchar(1000)
);

CREATE TABLE IF NOT EXISTS item_tag(
  ID SERIAL PRIMARY KEY,
  item_id integer REFERENCES items(id),
  tag_id integer REFERENCES tags(id)
);


INSERT INTO users (id) VALUES (1);
INSERT INTO users (id) VALUES (2);
-- INSERT INTO users (id) VALUES (3);

INSERT INTO tags (content) VALUES ('blue');
INSERT INTO tags (content) VALUES ('red');
INSERT INTO tags (content) VALUES ('green');
INSERT INTO tags (content) VALUES ('white');
INSERT INTO tags (content) VALUES ('black');

INSERT INTO tags (content) VALUES ('nike');
INSERT INTO tags (content) VALUES ('adidas');
INSERT INTO tags (content) VALUES ('new-balance');
INSERT INTO tags (content) VALUES ('reebok');
INSERT INTO tags (content) VALUES ('gucci');


INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 1), (select id from tags where content='blue'));

INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 1), (select id from tags where content='nike'));



INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 2), (select id from tags where content='red'));

INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 2), (select id from tags where content='adidas'));


-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='green'));

-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='new-balance'));



-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='white'));

-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='reebok'));



-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='black'));

-- INSERT INTO tag_user (user_id, tag_id) VALUES ((select id from users where id = 3), (select id from tags where content='gucci'));



-- select content from tags join tag_user on tag_id = tags.id where user_id = 1;

-- select content from tags join tag_user on tag_id = tags.id where user_id != 1;





INSERT INTO items (user_id, type, tsv) VALUES ((select id from users where id = 1), 'tops', 'green nike soccer sports short-sleeve');

INSERT INTO items (user_id, type, tsv) VALUES ((select id from users where id = 2), 'tops', 'blue green dress strapless zara pretty');

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 1), (select id from tags where id = 5));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 1), (select id from tags where id = 10));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 2), (select id from tags where id = 4));

INSERT INTO item_tag (item_id, tag_id) VALUES ((select id from items where id = 2), (select id from tags where id = 9));


select content from tags join item_tag on tag_id = tags.id where item_id = 2;

SELECT * FROM items WHERE to_tsvector(tsv) @@ to_tsquery('blue | green');

SELECT * FROM items WHERE to_tsvector(tsv) @@ to_tsquery('dress | green');

SELECT id, ts_rank(to_tsvector(tsv), to_tsquery('blue | green')) AS rank
    FROM items
    WHERE to_tsvector(tsv) @@ to_tsquery('blue | green')
    ORDER BY rank DESC;
