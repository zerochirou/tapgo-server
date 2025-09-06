import BusinessDomain from '#models/business_domain'
import { createBusinessDomain } from '#validators/business_domain'
import { Infer } from '@vinejs/vine/types'
import ImageService from './image_service.js'
import { inject } from '@adonisjs/core'

type CreateBusinessDomain = Infer<typeof createBusinessDomain>

@inject()
export class BusinessDomainService {
  constructor(protected imageService: ImageService) {}

  public async findAll() {
    return await BusinessDomain.all()
  }

  public async findById(id: string) {
    return await BusinessDomain.findByOrFail('id', id)
  }

  public async findByCategory(id: string) {
    return await BusinessDomain.findManyBy('category_id', id)
  }

  public async create(payload: CreateBusinessDomain) {
    const { backgroundImageUrl, backgroundImageFileName } =
      await this.imageService.uploadBackgroundImage(payload.image_background)
    const { businessIconUrl, businessIconFileName } = await this.imageService.uploadBusinessIcon(
      payload.business_icon
    )

    return await BusinessDomain.create({
      businessName: payload.business_name,
      address: payload.address,
      description: payload.description,
      imageBackground: backgroundImageUrl,
      businessIcon: businessIconUrl,
      imageBackgroundRelativePath: backgroundImageFileName,
      businessIconRelativePath: businessIconFileName,
      userId: payload.user_id,
      categoryId: payload.category_id,
    })
  }

  public async remove(id: string) {
    const businessDomainItem = await BusinessDomain.find(id)
    if (!businessDomainItem) {
      throw new Error('Category not found')
    }

    const backgroundImageUrl = businessDomainItem.imageBackgroundRelativePath
    const businessIconUrl = businessDomainItem.businessIconRelativePath

    await this.imageService.removeImage(backgroundImageUrl)
    await this.imageService.removeImage(businessIconUrl)

    await businessDomainItem.delete()
  }
}
