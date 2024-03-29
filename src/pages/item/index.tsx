import axios from 'axios'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import SyncroItemPage from '../../components/SyncroItemPage/SyncroItemPage'
import { SyncroItemDto } from '../../types/domain/syncro-item/SyncroItemDto'
import { cookieKeys } from '../../utils/consts/cookieKeys'
import { getItemTitleAndYear } from '../../utils/domains/syncro-item/getItemTitleAndYear'
import nookies from '../../utils/nookies'
import { urls } from '../../utils/urls/urls'

interface Props {
  item: SyncroItemDto | null
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { syncroItemId } = context.query
  let foundItem: SyncroItemDto | null = null

  const cookies = nookies.get(context)
  const prefetchedStr = cookies[cookieKeys.prefetchedItem(String(syncroItemId))]

  if (prefetchedStr) {
    foundItem = JSON.parse(prefetchedStr)

    // remove cookie
    nookies.destroy(context, cookieKeys.prefetchedItem(String(syncroItemId)), {
      path: '/',
    })
  }

  if (!foundItem && syncroItemId && typeof syncroItemId === 'string') {
    const res = await axios.get<SyncroItemDto>(
      urls.api.syncroItemDetails(syncroItemId)
    )
    if (res.data) foundItem = res.data
  }

  return {
    props: {
      item: foundItem,
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
          <meta property="og:title" content={getItemTitleAndYear(props.item)} />
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
          <meta
            name="twitter:title"
            content={getItemTitleAndYear(props.item)}
          />
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
