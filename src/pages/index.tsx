import type { NextPage } from 'next'
import HomePage from '../components/HomePage/HomePage'
import LandingPage from '../components/LandingPage/LandingPage'
import useAuthStore from '../hooks/zustand/useAuthStore'

const Home: NextPage = () => {
  const { authUser } = useAuthStore()
  if (authUser) return <HomePage />
  return <LandingPage />
}

export default Home
