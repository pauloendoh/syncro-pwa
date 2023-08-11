import { Box, Button, Center, Divider, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'
import { SiDiscord } from 'react-icons/si'
import { useMyRouterQuery } from '../../hooks/useMyRouterQuery'
import { myEnvs } from '../../utils/myEnvs'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import MyPaper from '../_common/overrides/MyPaper'
import Span from '../_common/text/Span'
import LoginForm from './LoginForm/LoginForm'
import PasswordResetForm from './PasswordResetForm/PasswordResetForm'
import RegisterForm from './RegisterForm/RegisterForm'
import TempUserButton from './TempUserButton/TempUserButton'

const AuthPage = () => {
  const router = useRouter()
  const { initialPage } = useMyRouterQuery()
  const [currentForm, setCurrentForm] = useState<
    'loginForm' | 'registerForm' | 'resetPassword'
  >()

  useEffect(() => {
    if (router.isReady && initialPage === 'signUp') {
      setCurrentForm('registerForm')
      return
    }
    setCurrentForm('loginForm')
  }, [router.isReady])

  const handleGoogleSignIn = () => {
    window.open(myEnvs.NEXT_PUBLIC_API_URL + '/auth/google', '_self')
  }

  return (
    <Box>
      <Center>
        <MyPaper p={24} mt={40} w={300}>
          <FlexCol align={'center'} gap={16}>
            <Title>Syncro</Title>

            {currentForm !== 'resetPassword' && (
              <Text align="center">
                Plan and review movies, TV shows, games, books and mangas. All
                in one place
              </Text>
            )}
          </FlexCol>

          <Box mt={24} />

          {currentForm === 'loginForm' && (
            <LoginForm
              onToggleForm={() => {
                setCurrentForm('registerForm')
              }}
              onClickResetPassword={() => {
                setCurrentForm('resetPassword')
              }}
            />
          )}
          {currentForm === 'registerForm' && (
            <RegisterForm
              onToggleForm={() => {
                setCurrentForm('loginForm')
              }}
            />
          )}
          {currentForm === 'resetPassword' && (
            <PasswordResetForm
              onChangeForm={() => {
                setCurrentForm('loginForm')
              }}
            />
          )}

          {currentForm !== 'resetPassword' && (
            <>
              <Box mt={16} />
              <Divider label="Or" labelPosition="center" />

              <FlexCol mt={16} gap={8}>
                <TempUserButton />

                <Button
                  leftIcon={<AiOutlineGoogle size={24} />}
                  fullWidth
                  color="dark"
                  size="lg"
                  onClick={handleGoogleSignIn}
                >
                  <Span size="0.8rem" w={160} align="center">
                    Enter with Google
                  </Span>
                </Button>
              </FlexCol>
              <Box mt={16} />

              <Center>
                <FlexVCenter gap={8}>
                  <SiDiscord />
                  <Link
                    href={'https://discord.gg/gx3TKUYfrb'}
                    target="_blank"
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    Join our Discord server!
                  </Link>
                </FlexVCenter>
              </Center>
            </>
          )}
        </MyPaper>
      </Center>
    </Box>
  )
}

export default AuthPage
