import axios, { AxiosResponse } from 'axios'
import { Shop } from '../types'

const axiosInstance = axios.create({
  baseURL: '/'
})
export const getShops = async (): Promise<Shop[]> => {
  const response: AxiosResponse<Shop[]> = await axiosInstance.get('shops.json')
  return response.data
}
