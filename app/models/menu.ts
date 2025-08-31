import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 as uuidV4 } from 'uuid'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'name' })
  declare name: string

  @column({ columnName: 'business_id' })
  declare businessId: string

  @column({ columnName: 'description' })
  declare description: string

  @column({ columnName: 'price' })
  declare price: number

  @column({ columnName: 'image_url' })
  declare imageUrl: string

  @column({ columnName: 'image_relative_path' })
  declare imageRelativePath: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static assignUuid(menu: Menu) {
    menu.id = uuidV4()
  }
}
