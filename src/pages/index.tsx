import type { NextPage } from 'next'
import HomePageContent from '../components/HomePageContent/HomePageContent'
import LandingPage from '../components/LandingPage/LandingPage'
import useAuthStore from '../hooks/zustand/useAuthStore'

const Home: NextPage = () => {
  const { authUser } = useAuthStore()
  if (authUser) return <HomePageContent />
  return <LandingPage />
}

export default Home
