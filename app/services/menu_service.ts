import { inject } from '@adonisjs/core'
import ImageService from './image_service.js'
import Menu from '#models/menu'
import { Infer } from '@vinejs/vine/types'
import { createMenu } from '#validators/menu'
import { CategoryMenuService } from './category_menu_service.js'

type CreateMenu = Infer<typeof createMenu>

@inject()
export class MenuService {
  constructor(
    protected imageService: ImageService,
    protected categoryMenuService: CategoryMenuService
  ) {}

  public async findAll() {
    return await Menu.all()
  }

  public async findById(id: string) {
    return await Menu.findByOrFail('id', id)
  }

  public async findByName(name: string) {
    return await Menu.findByOrFail('name', name)
  }

  public async findByCategory(category: string) {
    const categoryId = await this.categoryMenuService.findByName(category)
    return await Menu.findManyBy('category_id', categoryId.id)
  }

  public async create(payload: CreateMenu) {
    const { menuImageUrl, menuImageFileName } = await this.imageService.uploadMenuImage(
      payload.image
    )
    return await Menu.create({
      name: payload.name,
      businessId: payload.business_id,
      description: payload.description,
      price: payload.price,
      categoryId: payload.category_id,
      imageUrl: menuImageUrl,
      imageRelativePath: menuImageFileName,
    })
  }

  public async remove(id: string) {
    const menuItem = await Menu.find(id)
    if (!menuItem) {
      throw new Error('Category not found')
    }

    await this.imageService.removeImage(menuItem.imageRelativePath)
    await menuItem.delete()
  }

  public async edit(id: string, payload: CreateMenu) {
    const menuItem = await Menu.findOrFail(id)
    const { menuImageUrl, menuImageFileName } = await this.imageService.uploadMenuImage(
      payload.image
    )

    menuItem.name = payload.name
    menuItem.businessId = payload.business_id
    menuItem.description = payload.description
    menuItem.price = payload.price
    menuItem.imageRelativePath = menuImageFileName
    menuItem.imageUrl = menuImageUrl

    await menuItem.save()
  }
}
