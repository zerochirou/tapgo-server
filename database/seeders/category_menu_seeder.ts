import CategoriesMenu from '#models/categories_menu'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await CategoriesMenu.createMany([
      { categoryName: 'Minuman', emoji: '🍸' },
      { categoryName: 'Makanan', emoji: '🍽️' },
      { categoryName: 'Outfit', emoji: '👕' },
    ])
  }
}
