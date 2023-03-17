import { Box, Center, Divider, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useState } from 'react'
import { SiDiscord } from 'react-icons/si'
import FlexCol from '../_common/flex/FlexCol'
import FlexVCenter from '../_common/flex/FlexVCenter'
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
              Plan and review movies, TV shows, games, books and mangas. All in
              one place
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

          <Box mt={16} />
          <Divider />
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
        </MyPaper>
      </Center>
    </Box>
  )
}

export default LandingPageContent
