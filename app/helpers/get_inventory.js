// Get inventory excluding logged-in user's items
"use strict"

function getInventory() {
//  - Gets all items (excluding those belonging to logged in user)
//    and within size rang and returns them as objects.







SELECT id, ts_rank(to_tsvector(tsv), to_tsquery('blue | green')) AS rank
    FROM items
    WHERE to_tsvector(tsv) @@ to_tsquery('blue | green')
    ORDER BY rank DESC;



}

module.exorts = getInventory
