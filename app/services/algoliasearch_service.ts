import { algoliasearch, SearchClient } from 'algoliasearch'

export class AlgoliasearchService {
  private client: SearchClient

  constructor() {
    this.client = algoliasearch(
      process.env.ALGOLIA_APP_ID as string,
      process.env.ALGOLIA_API_KEY as string
    )
  }

  /**
   * Upload data ke Algolia
   * @param indexName Nama index di Algolia
   * @param internalDatas Array of model/data
   * @param serializer Fungsi optional untuk ubah data ke bentuk JSON
   */
  public async upload(indexName: string, internalDatas: any[], serializer?: (item: any) => any) {
    const objects = internalDatas.map((item) => {
      const base = serializer ? serializer(item) : (item.toJSON?.() ?? item)

      return {
        objectID: item.id || base.id, // pastikan ada objectID
        ...base,
      }
    })

    const res = await this.client.saveObjects({
      indexName,
      objects,
    })

    return res
  }
}
