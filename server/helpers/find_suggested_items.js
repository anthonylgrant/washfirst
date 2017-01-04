const findSuggestedItems = (req, res, knex) => {
  let query = req.query;

  let myItem;
  let otherItems;
  let promiseArr = [];

  const getItemTags = (itemInfo) => {
    return knex('tags').innerJoin('item_tag', 'tag_id', 'tags.id')
                .where('item_id', itemInfo.id)
                .then((rows) => {
      let itemTagArr = rows.map((tag) => {
        return tag.content;
      });
      itemInfo.tags = itemTagArr;
    });
  };

  const getUsername = (itemInfo) => {
    return knex('users').select('username').where('id', itemInfo.user_id).then((username) => {
      itemInfo.username = username[0].username;
    });
  };

  const getItems = (query) => {
    knex('items').where('id', query.myitemid).then((rows) => {
      myItem = rows;
      knex('items').whereIn('id', query.otherid).then((rows) => {
        otherItems = rows;

        myItem.forEach((item) => {
          promiseArr.push(getItemTags(item));
          promiseArr.push(getUsername(item));
        });

        otherItems.forEach((item) => {
          promiseArr.push(getItemTags(item));
          promiseArr.push(getUsername(item));
        });


        Promise.all(promiseArr).then(() => {
          res.json({
            myItem: myItem,
            otherItems: otherItems
          });
        });
      });
    });
  }

  getItems(query);

}

module.exports = findSuggestedItems;
