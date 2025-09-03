import Rating from '#models/rating'
import { createRating } from '#validators/rating'
import { Infer } from '@vinejs/vine/types'

type CreateRating = Infer<typeof createRating>
export class RatingService {
  public async findAll() {
    return await Rating.all()
  }

  public async findById(id: string) {
    return await Rating.findByOrFail('id', id)
  }

  public async findByRating(rating: number) {
    return await Rating.findManyBy('rating', rating)
  }

  public async createRating(payload: CreateRating) {
    // POTENTIAL WARN
    const maxRating = Number(process.env.RATING_MAX) || 10
    if (payload.rating <= maxRating) {
      return await Rating.create({
        userName: payload.username,
        rating: payload.rating,
        businessId: payload.business_id,
      })
    } else {
      return `rating cannot be more than ${maxRating}`
    }
  }

  public async removeRating(id: string) {
    const ratingItem = await Rating.findOrFail(id)
    await ratingItem.delete()
    return 'rating was deleted'
  }
}
