import axios from 'axios'

const BASE_URL = import.meta.env.MODE === 'development' ? 'https://tinder-clone-backend-six.vercel.app/api' : 'https://tinder-clone-backend-six.vercel.app/api'

export const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true,
})