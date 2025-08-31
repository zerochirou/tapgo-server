import { CategoryService } from '#services/category_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'
import { createCategory } from '#validators/category'

@inject()
export default class CategoriesController {
  constructor(protected categoryService: CategoryService) {}

  public async getAllCategories({ response }: HttpContext) {
    try {
      const categories = await this.categoryService.findAll()
      return response.ok(categories)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async getCategoryById({ response, request }: HttpContext) {
    try {
      const id = await request.param('id')
      const category = await this.categoryService.fingById(id)
      return response.ok(category)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async getCategoryByName({ response, request }: HttpContext) {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { category_name } = request.body()
      const category = await this.categoryService.findByName(category_name)
      return response.ok(category)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async createCategory({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(createCategory)
      const createdCategory = await this.categoryService.create(payload)
      return response.ok(createdCategory)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async editCategory({ response, request }: HttpContext) {
    try {
      const { id, category } = request.body()
      const editedCategory = await this.categoryService.edit(id, category)
      return response.ok(editedCategory)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async deleteCategory({ response, request }: HttpContext) {
    try {
      const id = request.param('id')
      const deletedCategory = await this.categoryService.remove(id)
      return response.ok(deletedCategory)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
