import { createMenu } from '#validators/menu'
import { MenuService } from '#services/menu_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class MenusController {
  constructor(protected menuService: MenuService) {}

  public async getAllMenus({ response }: HttpContext) {
    try {
      const menus = await this.menuService.findAll()
      return response.ok(menus)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async getMenuById({ response, request }: HttpContext) {
    try {
      const id: string = await request.param('id')
      const menu = await this.menuService.findById(id)
      return response.ok(menu)
      // your code here
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async getMenuByName({ response, request }: HttpContext) {
    try {
      const { name } = request.only(['name'])
      const menu = await this.menuService.findByName(name)
      return response.ok(menu)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async createMenu({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(createMenu)
      const createdMenu = await this.menuService.create(payload)
      return response.ok(createdMenu)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async editMenu({ response, request }: HttpContext) {
    try {
      const newMenu = await request.validateUsing(createMenu)
      const id = await request.param('id')
      const editedMenu = await this.menuService.edit(id, newMenu)
      return response.ok(editedMenu)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async removeMenu({ response, request }: HttpContext) {
    try {
      const id = await request.param('id')
      const deletedMenu = await this.menuService.remove(id)
      return response.ok(deletedMenu)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
