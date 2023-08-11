import type { NextPage } from 'next'
import AuthPage from '../../components/AuthPage/AuthPage'
import HomePage from '../../components/HomePage/HomePage'
import useAuthStore from '../../hooks/zustand/useAuthStore'

const Home: NextPage = () => {
  const { authUser } = useAuthStore()
  if (authUser) return <HomePage />
  return <AuthPage />
}

export default Home
