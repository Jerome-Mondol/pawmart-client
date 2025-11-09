import { axiosInstance } from "../axios/axios"

export const getPets = (count) => {
    return axiosInstance.get('/pets', {
        params: count ? { count } : {},
    })
} 