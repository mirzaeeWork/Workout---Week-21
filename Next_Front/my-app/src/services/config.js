// hooks/useAxiosWithRedirect.js
import { useRouter } from 'next/router'
import { useRef } from 'react'
import axios from 'axios'
import { getToken, removeToken, removeUser } from '../helper/cookie'
import { useFilter } from '@/context/FilterContext'

export function useAxiosWithRedirect () {
  const router = useRouter()
  const {  setOpenModalProduct } = useFilter()
  const axiosRef = useRef(null)

  if (!axiosRef.current) {
    const instance = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}` })

    instance.interceptors.request.use(config => {
      const token = getToken()
      if (token) config.headers.Authorization = `Bearer ${token}`
      return config
    })

    instance.interceptors.response.use(
      response => response.data,
      error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          removeToken()
          removeUser()
          setTimeout(() => {
            setOpenModalProduct(false)
            router.push('/')
          }, 2000)
        }
        return Promise.reject(error)
      }
    )

    axiosRef.current = instance
  }

  return axiosRef.current
}
