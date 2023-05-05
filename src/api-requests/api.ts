import type { AxiosStatic } from 'axios'
import type { IPage, PositionFunction, JobListing } from '@/models/models'

export default class BaseApi {
  public axios!: AxiosStatic
  protected baseUrl: string

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url
    this.axios = axios
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data)

  public getJobListings = (
    pageSize: number | null,
    page: number,
    positionFunctionId: number[]
  ): Promise<IPage<JobListing> | JobListing[]> => {
    const isPaginationNeed = pageSize !== null
    const isFilterByPositionNeed = positionFunctionId.length > 0

    return this.axios
      .get(
        `${this.baseUrl}job/listings/?use_pagination=${
          isPaginationNeed ? `True&page_size=${pageSize}&page=${page}` : `False`
        }${isFilterByPositionNeed ? `&position_functions=${positionFunctionId.join(',')}` : ``}`
      )
      .then((response) => response.data)
  }

  /**
   * TIP: Create a function called getJobListings
   * Use our public api documentation to find out what endpoint to use
   * https://test-api.mojob.io/public/docs/
   */
}
