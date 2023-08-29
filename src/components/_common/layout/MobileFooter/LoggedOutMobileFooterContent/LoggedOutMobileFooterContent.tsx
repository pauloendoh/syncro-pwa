import { Center, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { MdSearch } from 'react-icons/md'
import { urls } from '../../../../../utils/urls/urls'
import FlexVCenter from '../../../flex/FlexVCenter'
import MyNextLink from '../../../overrides/MyNextLink'
import NavbarSignButtons from '../../NavbarSignButtons/NavbarSignButtons'

type Props = {}

const LoggedOutMobileFooterContent = (props: Props) => {
  const router = useRouter()
  const theme = useMantineTheme()
  return (
    <>
      <FlexVCenter>
        <MyNextLink href={urls.pages.index}>
          <Title order={4}>Syncro</Title>
        </MyNextLink>
        <MyNextLink
          href={urls.pages.search()}
          style={{
            color:
              router.pathname === '/search' ? theme.colors.primary[9] : 'gray',
          }}
        >
          <Center w={60} h={60}>
            <MdSearch size={24} />
          </Center>
        </MyNextLink>
      </FlexVCenter>

      <NavbarSignButtons />
    </>
  )
}

export default LoggedOutMobileFooterContent
