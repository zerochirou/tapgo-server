import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'menus'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('name').notNullable()
      table
        .uuid('business_id')
        .references('id')
        .inTable('business_domains')
        .onDelete('CASCADE')
        .notNullable()
      table.uuid('category_id').references('id').inTable('categories_menu').onDelete('CASCADE')
      table.string('description')
      table.decimal('price', 10, 2).notNullable()
      table.string('image_url').notNullable()
      table.string('image_relative_path').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
