import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { v4 as uuidV4 } from 'uuid'
import Menu from './menu.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class CategoriesMenu extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'category_name' })
  declare categoryName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(category: CategoriesMenu) {
    category.id = uuidV4()
  }

  @hasMany(() => Menu)
  declare menu: HasMany<typeof Menu>
}
