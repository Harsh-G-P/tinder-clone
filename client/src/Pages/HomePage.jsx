import React, { useEffect } from 'react'
import Sidebar from '../Components/Sidebar'
import { useMatchStore } from '../Store/useMatchStore'
import Header from '../Components/Header'
import { Frown } from 'lucide-react'
import SwipeArea from '../Components/SwipeArea'
import SwipeFeedback from '../Components/SwipeFeedback'
import { useAuthStore } from '../Store/useAuthStore'

const HomePage = () => {

  const {isLoadingUserProfiles,getUserProfiles,userProfiles,subscribeToNewMatches,unsubscribeFromNewMatches} = useMatchStore()

  const {authUser} = useAuthStore()

  useEffect(()=>{
    getUserProfiles()
  },[getUserProfiles])

  useEffect(()=>{
    authUser && subscribeToNewMatches()
    return () =>{
      unsubscribeFromNewMatches()
    }
  },[subscribeToNewMatches,unsubscribeFromNewMatches,authUser])

  return (
    <div className='flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden'>
      <Sidebar />
      <div className='flex-grow flex flex-col overflow-hidden'>
        <Header />
        <main className='flex-grow flex flex-col gap-10 justify-center items-center p-4 relative overflow-hidden'>
          {userProfiles.length > 0 && !isLoadingUserProfiles && (
            <>
            <SwipeArea />
            <SwipeFeedback />
            </>
          )}
          {userProfiles.length === 0 && !isLoadingUserProfiles && (
            <NoMoreProfiles />
          )}

          {isLoadingUserProfiles && <LoadingState />}
        </main>
      </div>
    </div>
  )
}

export default HomePage


const NoMoreProfiles = ()=>(
    <div className='flex flex-col items-center justify-center h-full text-center p-8'>
        <Frown className='text-pink-400 mb-6' size={80} />
        <h3 className='text-3xl font-bold text-gray-800 mb-4'>woah there, speedy fingers!</h3>
        <p className='text-xl text-gray-600 mb-6'>
            Bro are you OK? Maybe it&apos;s time to touch some grass.
        </p>
    </div>
)

const LoadingState =()=>{
  return (
    <div className='relative w-full max-w-sm h-[28rem]'>
      <div className='card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
        <div className='px-4 pt-4 h-3/4'>
          <div className='w-full h-full bg-gray-200 rounded-lg' />
        </div>
        <div className='card-body bg-gradient-to-b from-white to-pink-50 p-4'>
          <div className='space-y-2'>
            <div className='h-6 bg-gray-200 rounded w-3/4' />
            <div className='h-4 bg-gray-200 rounded w-1/2' />
          </div>
        </div>
      </div>
    </div>
  )
}