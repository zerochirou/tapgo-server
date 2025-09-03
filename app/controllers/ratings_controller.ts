import logger from '@adonisjs/core/services/logger'
import { RatingService } from '#services/rating_service'
import type { HttpContext } from '@adonisjs/core/http'
import { createRating } from '#validators/rating'
import { inject } from '@adonisjs/core'

@inject()
export default class RatingsController {
  constructor(protected ratingService: RatingService) {}

  public async findAllRatings({ response }: HttpContext) {
    try {
      const ratings = await this.ratingService.findAll()
      return response.ok(ratings)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async findRatingById({ response, request }: HttpContext) {
    try {
      const id: string = await request.param('id')
      const ratingItem = await this.ratingService.findById(id)
      return response.ok(ratingItem)
      // your code here
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async findRatingByRating({ response, request }: HttpContext) {
    try {
      const rating = await request.param('rating')
      const ratingItems = await this.ratingService.findByRating(rating)
      return response.ok(ratingItems)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async createRating({ response, request }: HttpContext) {
    try {
      const payload = await request.validateUsing(createRating)
      const createdRating = await this.ratingService.createRating(payload)
      return response.ok(createdRating)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }

  public async removeRating({ response, request }: HttpContext) {
    try {
      const id = await request.param('id')
      const deletedRating = await this.ratingService.removeRating(id)
      return response.ok(deletedRating)
    } catch (error) {
      logger.error({ message: error })
      return response.internalServerError('internal server error')
    }
  }
}
