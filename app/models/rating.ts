import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { v4 as uuidV4 } from 'uuid'
import BusinessDomain from './business_domain.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Rating extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'username' })
  declare userName?: string

  @column({ columnName: 'rating' })
  declare rating: number

  @column({ columnName: 'business_id' })
  declare businessId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static unSignUuid(rating: Rating) {
    rating.id = uuidV4()
  }

  @belongsTo(() => BusinessDomain)
  declare businessDomain: BelongsTo<typeof BusinessDomain>
}
