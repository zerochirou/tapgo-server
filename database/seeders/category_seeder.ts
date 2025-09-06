import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Category.createMany([
      { categoryName: 'Kafe', emoji: '🍵' },
      { categoryName: 'Wisata', emoji: '🎲' },
      { categoryName: 'Rumah Makan', emoji: '🍽️' },
      { categoryName: 'Toko Baju', emoji: '🛍️' },
    ])
  }
}
