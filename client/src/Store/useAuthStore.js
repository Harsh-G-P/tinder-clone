import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { disconnectSocket, initializeSocket } from '../socket/socket.client'

export const useAuthStore = create ((set)=>({
    authUser:null,
    checkingAuth:true,

    loading: false,

    signup: async(signupData)=>{
        try {
            set({loading:true})
            const res = await axiosInstance.post('/auth/sign',signupData)
            set({authUser:res.data.user})
            initializeSocket(res.data.user._id)
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Something went Wrong")
        } finally{
            set({loading:false})
        }
    },

    login: async(loginData)=>{
        try {
            set({loading:true})
            const res = await axiosInstance.post('/auth/login',loginData)
            set({authUser:res.data.user})
            initializeSocket(res.data.user._id)
            toast.success("Login successfully")
        } catch (error) {
            toast.error(error.response.data.msg || "Something went Wrong")
        } finally{
            set({loading:false})
        }
    },

    logout: async()=>{
        try {
            const res = await axiosInstance.post('/auth/logout')
            disconnectSocket()
            if (res.status === 200) {
                set({authUser:null})
            }
            toast.success("Logout Successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Something went Wrong")
        }
    },

    checkAuth : async()=>{
        try {
            const res = await axiosInstance.get('/auth/me')
            initializeSocket(res.data.user._id)
            set(({authUser:res.data.user}))  
        } catch (error) {
            console.log(error)    
        } finally {
            set({checkingAuth:false})
        }
    },
    
    setAuthUser: (user) => set({ authUser: user }),
}))