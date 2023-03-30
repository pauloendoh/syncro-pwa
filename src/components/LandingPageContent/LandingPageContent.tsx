import { Box, Button, Center, Divider, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai'
import { SiDiscord } from 'react-icons/si'
import { myEnvs } from '../../utils/myEnvs'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
import MyPaper from '../_common/overrides/MyPaper'
import LoginForm from './LoginForm/LoginForm'
import PasswordResetForm from './PasswordResetForm/PasswordResetForm'
import RegisterForm from './RegisterForm/RegisterForm'

type Props = {}

const LandingPageContent = (props: Props) => {
  const [currentForm, setCurrentForm] = useState<
    'loginForm' | 'registerForm' | 'resetPassword'
  >('loginForm')

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

              <Box mt={16}>
                <Button
                  leftIcon={<AiOutlineGoogle size={24} />}
                  fullWidth
                  color="dark"
                  size="lg"
                  onClick={handleGoogleSignIn}
                >
                  Enter with Google
                </Button>
              </Box>
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

export default LandingPageContent
