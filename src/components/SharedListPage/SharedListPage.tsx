import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useMySharedListsQuery } from '../../hooks/react-query/shared-list/useMySharedListsQuery'
import { useSharedListItemsQuery } from '../../hooks/react-query/shared-list/useSharedListItemsQuery'
import FlexCol from '../_common/flex/FlexCol'
import DefaultLayout from '../_common/layout/DefaultLayout'
import MobileHeader from '../dating/DatingLayout/MobileHeader/MobileHeader'
import { SharedListTable } from './SharedListTable/SharedListTable'

export const SharedListPage = () => {
  const { query } = useRouter()

  const sharedListId = query.sharedListId as string

  const { data, isLoading } = useMySharedListsQuery()

  const selectedList = useMemo(() => {
    return data?.find((list) => list.id === sharedListId)
  }, [data, sharedListId])

  const { data: items } = useSharedListItemsQuery(sharedListId)

  return (
    <DefaultLayout>
      <MobileHeader
        title={selectedList?.title ?? 'Loading...'}
        fixedHeader={false}
      />
      <Container size="xl">
        <FlexCol gap={24}>
          {selectedList && (
            <SharedListTable
              selectedList={selectedList}
              items={items ?? []}
              tableType="Interest"
            />
          )}
        </FlexCol>
      </Container>
    </DefaultLayout>
  )
}
