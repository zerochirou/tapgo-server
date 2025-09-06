import CategoriesMenu from '#models/categories_menu'
import { createCategoryMenu } from '#validators/category_menu'
import { Infer } from '@vinejs/vine/types'
import { AlgoliasearchService } from './algoliasearch_service.js'
import { inject } from '@adonisjs/core'

type CreateCategoriesMenu = Infer<typeof createCategoryMenu>
@inject()
export class CategoryMenuService {
  constructor(protected algoliasearchService: AlgoliasearchService) {}

  public async findAll() {
    return await CategoriesMenu.all()
  }

  public async findByName(name: string) {
    return await CategoriesMenu.findByOrFail('category_name', name)
  }

  public async create(payload: CreateCategoriesMenu) {
    return await CategoriesMenu.create({
      categoryName: payload.category_name,
      emoji: payload.emoji,
    })
  }

  public async remove(id: string) {
    const categoriesMenu = await CategoriesMenu.find(id)
    await categoriesMenu?.delete()
  }

  public async sendDataToAlgolia() {
    const data = await CategoriesMenu.all()
    return await this.algoliasearchService.upload('category_menu', data)
  }
}
