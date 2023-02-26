import { Box, Center, Text, Title } from '@mantine/core'
import { useState } from 'react'
import FlexCol from '../_common/flex/FlexCol'
import MyPaper from '../_common/overrides/MyPaper'
import LoginForm from './LoginForm/LoginForm'
import RegisterForm from './RegisterForm/RegisterForm'

type Props = {}

const LandingPageContent = (props: Props) => {
  const [currentForm, setCurrentForm] = useState<'loginForm' | 'registerForm'>(
    'loginForm'
  )

  return (
    <Box>
      <Center>
        <MyPaper p={16} mt={40} w={300}>
          <FlexCol align={'center'} gap={16}>
            <Title>Syncro</Title>
            <Text align="center">
              Review movies, TV shows, games, books and mangas. All in one place
            </Text>
          </FlexCol>

          <Box mt={24} />

          {currentForm === 'loginForm' && (
            <LoginForm
              onToggleForm={() => {
                setCurrentForm('registerForm')
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
        </MyPaper>
      </Center>
    </Box>
  )
}

export default LandingPageContent
