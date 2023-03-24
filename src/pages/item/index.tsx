import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import SyncroItemPageContent from '../../components/_common/SyncroItemPageContent/SyncroItemPageContent'
import { SyncroItemDto } from '../../types/domain/syncro-item/SyncroItemDto'
import { urls } from '../../utils/urls'

interface Props {
  item: SyncroItemDto | null
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { syncroItemId } = context.query
  let item = null
  if (syncroItemId && typeof syncroItemId === 'string') {
    const res = await axios.get<SyncroItemDto>(
      urls.api.syncroItemDetails(syncroItemId)
    )
    if (res.data) item = res.data
  }

  console.log({
    item,
  })
  return {
    props: {
      item,
    },
  }
}

const UserItemNextPage: NextPage<Props> = (props) => {
  return (
    <>
      {props.item && (
        <Head>
          <title>
            {props.item.title} - {props.item.year} - Syncro
          </title>
          <meta property="og:title" content={props.item?.title || 'Syncro'} />
          <meta
            property="og:description"
            content={props.item?.plotSummary || 'Review everything'}
          />
          {props.item.imageUrl && (
            <meta property="og:image" content={props.item.imageUrl} />
          )}
        </Head>
      )}
      <SyncroItemPageContent />
    </>
  )
}

export default UserItemNextPage
