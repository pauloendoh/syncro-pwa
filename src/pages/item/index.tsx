import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import SyncroItemPage from '../../components/SyncroItemPage/SyncroItemPage'
import { SyncroItemDto } from '../../types/domain/syncro-item/SyncroItemDto'
import { cookieKeys } from '../../utils/consts/cookieKeys'
import nookies from '../../utils/nookies'
import { urls } from '../../utils/urls'

interface Props {
  item: SyncroItemDto | null
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { syncroItemId } = context.query
  let item: SyncroItemDto | null = null

  const cookies = nookies.get(context)
  const prefetchedStr = cookies[cookieKeys.prefetchedItem(String(syncroItemId))]

  if (prefetchedStr) {
    item = JSON.parse(prefetchedStr)

    // remove cookie
    nookies.destroy(context, cookieKeys.prefetchedItem(String(syncroItemId)), {
      path: '/',
    })
  }

  if (!item && syncroItemId && typeof syncroItemId === 'string') {
    const res = await axios.get<SyncroItemDto>(
      urls.api.syncroItemDetails(syncroItemId)
    )
    if (res.data) item = res.data
  }

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
            content={props.item?.plotSummary || 'Syncro - Review everything'}
          />
          {props.item.imageUrl && (
            <>
              <meta property="og:image" content={props.item.imageUrl} />
            </>
          )}
          {/* twitter */}
          {/* not large image */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@syncroapp" />
          <meta name="twitter:creator" content="@syncroapp" />
          <meta name="twitter:title" content={props.item?.title || 'Syncro'} />
          <meta
            name="twitter:description"
            content={props.item?.plotSummary || 'Syncro - Review everything'}
          />

          {props.item.imageUrl && (
            <>
              <meta name="twitter:image" content={props.item.imageUrl} />
            </>
          )}
        </Head>
      )}
      <SyncroItemPage initialData={props.item} />
    </>
  )
}

export default UserItemNextPage
