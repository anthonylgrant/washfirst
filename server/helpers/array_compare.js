/*
  This function takes two arguments:
                  1. An array representing preference tags
                  2. An array representing an item's tags
  It returns:
                  1. A number that items can be ranked upon.

*/

function compareArrays(preferences, itemTags) {

  p = new Set(preferences);
  iT = new Set(itemTags);

  const numOfPreferences = p.size;
  const numOfItemTags = iT.size;
  let overlap = 0;

  if(numOfPreferences === 0) {
    return 0;
  }

  p.forEach((tag) => {
    if (iT.has(tag)) {
      overlap += 1;
    }
  });

  const relation = (overlap/numOfPreferences);

  return relation;
}

module.exports = compareArrays;

// const prefs1 = ['blue', 'solid', 'normcore', 'slim-fit', 'AA', 'henley'];
// const prefs2 = ['red', 'checkered', 'goth', 'loose', 'gucci', 'baseball'];
// const prefs3 = ['blue', 'solid', 'normcore', 'slim-fit', 'AA', 'henley', 'this', 'that', 'theOther'];
// const prefs4 = ['blue', 'solid', 'normcore', 'loose', 'gucci',];
//
// const itemTags = ['blue', 'solid', 'normcore', 'slim-fit', 'AA', 'henley'];
//
// compareArrays(prefs1, itemTags);
// compareArrays(prefs2, itemTags);
// compareArrays(prefs3, itemTags);
// compareArrays(prefs4, itemTags);
