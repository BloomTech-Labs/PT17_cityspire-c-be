exports.seed = function (knex) {
  // Deletes favs existing entries
  return knex('profiles')
    .column('fav')
    .del()
    .then(function () {
      return knex('profiles')
        .where({ profile_id: '00ulthapbErVUwVJy4x6' })
        .insert([
          {
            favs: [
              ['wichita', 'Kansas'],
              ['Atlanta', 'Georgia'],
            ],
          },
        ]);
    });
};
