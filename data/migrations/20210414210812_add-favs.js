// Adds a column for favourites attached to the profile table

exports.up = function (knex) {
  return knex.schema.table('profiles') function (table){
      table.json('favs')
  }
};

exports.down = function (knex) {
    return knex.schema.table('profiles') function (table){
        table.dropColumn('favs')
};
