import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { createBusinessDomain } from '#validators/business_domain'
import { BusinessDomainService } from '#services/business_domain_service'
import logger from '@adonisjs/core/services/logger'

@inject()
export default class BusinessDomainsController {
  constructor(protected businessDomainService: BusinessDomainService) {}

  public async getAllBusinessDomain({ response }: HttpContext) {
    try {
      const businessDomains = await this.businessDomainService.findAll()
      response.ok(businessDomains)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async getBusinessDomainById({ response, request }: HttpContext) {
    try {
      const id = await request.param('id')
      const businessDomain = await this.businessDomainService.findById(id)
      response.ok(businessDomain)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async getBusinessDomainByCategory({ response, request }: HttpContext) {
    try {
      const id = await request.param('id')
      const businessDomain = await this.businessDomainService.findByCategory(id)
      response.ok(businessDomain)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async createBusinessDomain({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(createBusinessDomain)
      const createdBusinessDomain = await this.businessDomainService.create(payload)
      return response.ok(createdBusinessDomain)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async removeBusinessDomainById({ response, request }: HttpContext) {
    try {
      const id = await request.param('id')
      const removedBusinessDomain = await this.businessDomainService.remove(id)
      response.ok(removedBusinessDomain)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
