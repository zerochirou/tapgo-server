import type { HttpContext } from '@adonisjs/core/http'
import { CategoryMenuService } from '#services/category_menu_service'
import logger from '@adonisjs/core/services/logger'
import { createCategoryMenu } from '#validators/category_menu'
import { inject } from '@adonisjs/core'

@inject()
export default class CategoryMenusController {
  constructor(protected categoryMenuService: CategoryMenuService) {}

  public async getAllCategoryMenu({ response }: HttpContext) {
    try {
      const categoriesMenu = await this.categoryMenuService.findAll()
      return response.ok(categoriesMenu)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async create({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(createCategoryMenu)
      const categoryMenu = await this.categoryMenuService.create(payload)
      return response.ok(categoryMenu)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
