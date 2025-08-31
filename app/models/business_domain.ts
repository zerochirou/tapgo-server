import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { v4 as uuidV4 } from 'uuid'
import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import Category from './category.js'
import Menu from './menu.js'

export default class BusinessDomain extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'business_name' })
  declare businessName: string

  @column({ columnName: 'address' })
  declare address: string

  @column({ columnName: 'description' })
  declare description: string

  @column({ columnName: 'image_background' })
  declare imageBackground: string

  @column({ columnName: 'business_icon' })
  declare businessIcon: string

  @column({ columnName: 'user_id' })
  declare userId: string

  @column({ columnName: 'category_id' })
  declare categoryId: string

  @column({ columnName: 'image_background_relative_path' })
  declare imageBackgroundRelativePath: string

  @column({ columnName: 'business_icon_relative_path' })
  declare businessIconRelativePath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(businessDomain: BusinessDomain) {
    businessDomain.id = uuidV4()
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => Menu)
  declare menus: HasMany<typeof Menu>
}
