const findSuggestedItems = (req, res, knex) => {
  let query = req.query;

  let myItem;
  let otherItems;
  let promiseArr = [];

  const getItemTags = (itemInfo) => new Promise((resolve, reject) => {
    knex('tags').innerJoin('item_tag', 'tag_id', 'tags.id')
                .where('item_id', itemInfo.id)
                .asCallback((err, rows) => {
      if (err) {
        console.log(err);
        reject("inside getItemTags");
      } else {
        let itemTagArr = rows.map((tag) => {
          return tag.content;
        });
        itemInfo.tags = itemTagArr;
        resolve();
      }
    });
  });

  const getItems = (query) => {
    knex('items').where('id', query.myitemid).then((rows) => {
      myItem = rows;
      knex('items').whereIn('id', query.otherid).then((rows) => {
        otherItems = rows;
        myItem.forEach((item) => {
          promiseArr.push(getItemTags(item));
        });
        otherItems.forEach((item) => {
          promiseArr.push(getItemTags(item));
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
