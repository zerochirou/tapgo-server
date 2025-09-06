import Category from '#models/category'
import { createCategory } from '#validators/category'
import { Infer } from '@vinejs/vine/types'

type CreateCategory = Infer<typeof createCategory>
export class CategoryService {
  public async findAll() {
    return await Category.all()
  }

  public async fingById(id: string) {
    return await Category.findByOrFail('id', id)
  }

  public async findByName(categoryName: string) {
    return await Category.findByOrFail('categoryName', categoryName)
  }

  public async create(payload: CreateCategory) {
    return await Category.create({
      categoryName: payload.category_name,
      emoji: payload.emoji,
    })
  }

  public async edit(id: string, payload: CreateCategory) {
    const categoryItem = await Category.find(id)
    if (!categoryItem) {
      throw new Error('Category not found')
    }

    categoryItem.categoryName = payload.category_name
    await categoryItem.save()
  }

  public async remove(id: string) {
    const categoryItem = await Category.find(id)
    if (!categoryItem) {
      throw new Error('Category not found')
    }

    await categoryItem.delete()
  }
}
