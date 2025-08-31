import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import { v4 as uuidV4 } from 'uuid'
import BusinessDomain from './business_domain.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'category_name' })
  declare categoryName: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(category: Category) {
    category.id = uuidV4()
  }

  @hasMany(() => BusinessDomain)
  declare businessDomain: HasMany<typeof BusinessDomain>
}
