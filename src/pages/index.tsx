import type { NextPage } from 'next'
import HomePageContent from '../components/HomePageContent/HomePageContent'
import LandingPageContent from '../components/LandingPageContent/LandingPageContent'
import useAuthStore from '../hooks/zustand/useAuthStore'

const Home: NextPage = () => {
  const { authUser } = useAuthStore()
  if (authUser) return <HomePageContent />
  return <LandingPageContent />
}

export default Home
