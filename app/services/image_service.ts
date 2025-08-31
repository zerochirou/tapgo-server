import { supabase } from '#start/supabase'
import { v4 as uuid } from 'uuid'
import fs from 'node:fs'

export default class ImageService {
  public async uploadBackgroundImage(file: any): Promise<any> {
    if (!file) throw new Error('No file uploaded')

    const fileName = `background_images/background-image-${uuid()}-${file.clientName}`
    const fileBuffer = fs.readFileSync(file.tmpPath!)

    const { error } = await supabase.storage.from('images_pool').upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true,
    })

    if (error) throw error

    const { data: publicUrl } = supabase.storage.from('images_pool').getPublicUrl(fileName)
    const imgUrl = publicUrl.publicUrl
    return { backgroundImageUrl: imgUrl, backgroundImageFileName: fileName }
  }

  public async uploadBusinessIcon(file: any): Promise<any> {
    if (!file) throw new Error('No file uploaded')

    const fileName = `business_icon/business-icon-${uuid()}-${file.clientName}`
    const fileBuffer = fs.readFileSync(file.tmpPath!)

    const { error } = await supabase.storage.from('images_pool').upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true,
    })

    if (error) throw error

    const { data: publicUrl } = supabase.storage.from('images_pool').getPublicUrl(fileName)
    const imageUrl = publicUrl.publicUrl
    return { businessIconUrl: imageUrl, businessIconFileName: fileName }
  }

  public async uploadMenuImage(file: any): Promise<any> {
    if (!file) throw new Error('No file uploaded')

    const fileName = `menu_images/menu-images-${uuid()}-${file.clientName}`
    const fileBuffer = fs.readFileSync(file.tmpPath!)

    const { error } = await supabase.storage.from('images_pool').upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true,
    })

    if (error) throw error

    const { data: publicUrl } = supabase.storage.from('images_pool').getPublicUrl(fileName)
    const imageUrl = publicUrl.publicUrl
    return { menuImageUrl: imageUrl, menuImageFileName: fileName }
  }

  public async removeImage(pathRelative: string) {
    const { data, error } = await supabase.storage.from('images_pool').remove([pathRelative])

    if (error) {
      throw new Error(`Gagal hapus file: ${error.message}`)
    }

    return data
  }
}
