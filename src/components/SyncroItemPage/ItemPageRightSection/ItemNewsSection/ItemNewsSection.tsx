import { Title } from '@mantine/core'
import { format } from 'timeago.js'
import { useItemNewsQuery } from '../../../../hooks/react-query/syncro-item/useItemNewsQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import { getDomainFromUrl } from '../../../../utils/text/getDomainFromUrl'
import FlexCol from '../../../_common/flex/FlexCol'
import CenterLoader from '../../../_common/overrides/CenterLoader/CenterLoader'
import MyPaper from '../../../_common/overrides/MyPaper'
import Span from '../../../_common/text/Span'

type Props = {
  item: SyncroItemDto
}

const ItemNewsSection = ({ ...props }: Props) => {
  const { isLoading, data } = useItemNewsQuery(props.item.id)

  return (
    <MyPaper className="ItemNewsSection">
      <Title order={4}>News</Title>
      {isLoading && <CenterLoader />}

      <FlexCol gap={32} mt={8}>
        {data?.slice(0, 3).map((news) => (
          <a
            key={news.url}
            href={news.url}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'unset',
              color: 'unset',
            }}
          >
            <FlexCol key={news.url} gap={8}>
              <img
                src={news.image}
                alt={news.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <FlexCol>
                <Span size="sm">{news.title}</Span>

                <Span size="sm" color="dimmed">
                  {getDomainFromUrl(news.url)}
                  {news.date && (
                    <span>
                      {' · '} {format(news.date)}
                    </span>
                  )}
                </Span>
              </FlexCol>
            </FlexCol>
          </a>
        ))}
      </FlexCol>
    </MyPaper>
  )
}

export default ItemNewsSection
