import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import DefaultLayout from '../_common/layout/DefaultLayout'
import MobileHeader from '../dating/DatingLayout/MobileHeader/MobileHeader'
import { MySharedListsSection } from './MySharedListsSection/MySharedListsSection'

export const MySharedListsPage = () => {
  const { query } = useRouter()

  const sharedListId = query.sharedListId as string | undefined

  return (
    <DefaultLayout>
      <MobileHeader title="My shared lists" />
      <Container size="xl">
        <MySharedListsSection />
      </Container>
    </DefaultLayout>
  )
}
