import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'business_domains'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('business_name').notNullable().unique()
      table.string('address').notNullable()
      table.string('description', 200).notNullable()
      table.string('image_background').unique()
      table.string('business_icon').notNullable()
      table.string('image_background_relative_path').notNullable()
      table.string('business_icon_relative_path').notNullable()
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()
      table
        .uuid('category_id')
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
        .notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
