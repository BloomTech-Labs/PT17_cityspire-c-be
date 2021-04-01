// const { increment } = require('../db-config');

exports.up = (knex) => {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('profiles', function (table) {
            table.string('id').notNullable().unique().primary();
            table.string('email').unique();
            table.string('name');
            table.string('avatarUrl');
            table.string('username').unique();
            table.string('zip_code');
            table.timestamps(true, true);
        })
        .createTable('cities', function (table) {
            table.increments();
            table.string('city');
            table.string('state');
            table.float('diversity_index');
            table.float('population');
            table.float('rental_price');
            table.string('crime');
            table.string('air_quality_index');
            table.float('walkability');
            table.float('livability');
            table.float('latitude');
            table.float('longitude');
            table
                .string('profile_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('profiles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('posts', function (table) {
            table.increments();
            table.string('body');
            table
                .string('profile_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('profiles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.timestamps(true, true);
        })
        .createTable('comments', function (table) {
            table.increments();
            table.string('body');
            table
                .integer('post_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('posts')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table
                .string('profile_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('profiles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.timestamps(true, true);
        })
        .createTable('comment_replies', function (table) {
            table.increments();
            table.string('body');
            table
                .integer('comment_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('comments')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table
                .string('profile_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('profiles')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.timestamps(true, true);
        });
};

exports.down = (knex) => {
    return knex.schema
        .dropTableIfExists('comment_replies')
        .dropTableIfExists('comments')
        .dropTableIfExists('posts')
        .dropTableIfExists('cities')
        .dropTableIfExists('profiles');
};
