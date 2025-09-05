import CategoriesMenu from '#models/categories_menu'
import { createCategoryMenu } from '#validators/category_menu'
import { Infer } from '@vinejs/vine/types'

type CreateCategoriesMenu = Infer<typeof createCategoryMenu>
export class CategoryMenuService {
  public async findAll() {
    const categoriesMenu = await CategoriesMenu.all()
    return categoriesMenu
  }

  public async findByName(name: string) {
    return await CategoriesMenu.find(name)
  }

  public async create(payload: CreateCategoriesMenu) {
    return await CategoriesMenu.create({
      categoryName: payload.category_name,
    })
  }

  public async remove(id: string) {
    const categoriesMenu = await CategoriesMenu.find(id)
    await categoriesMenu?.delete()
  }
}
