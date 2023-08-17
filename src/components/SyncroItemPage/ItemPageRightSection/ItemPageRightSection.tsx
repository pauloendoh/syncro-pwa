import { Anchor, Flex, Title } from '@mantine/core'
import { useMemo } from 'react'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import MyPaper from '../../_common/overrides/MyPaper'
import Span from '../../_common/text/Span'
import ItemNewsSection from './ItemNewsSection/ItemNewsSection'

type Props = {
  item: SyncroItemDto
}

const ItemPageRightSection = ({ ...props }: Props) => {
  const hasAuthors = useMemo(() => {
    return (
      props.item?.mangaExtraInfo?.authors &&
      props.item?.mangaExtraInfo?.authors.length > 0
    )
  }, [props.item])

  return (
    <FlexCol className="ItemPageRightSection" gap={24} maw={300}>
      {hasAuthors && (
        <MyPaper>
          <FlexCol gap={16}>
            <Title order={6}>Authors</Title>
            <Flex wrap={'wrap'} gap={16}>
              {props.item.mangaExtraInfo?.authors.map((authorConnection) => (
                <Flex key={authorConnection.authorId} gap={16}>
                  <FlexCol>
                    <Anchor
                      href={authorConnection.author.malUrl}
                      target="_blank"
                      color="white"
                    >
                      <Span>{authorConnection.author.name}</Span>
                    </Anchor>
                    <Span color="dimmed">{authorConnection.role}</Span>
                  </FlexCol>
                </Flex>
              ))}
            </Flex>
          </FlexCol>
        </MyPaper>
      )}

      <ItemNewsSection item={props.item} />
    </FlexCol>
  )
}

export default ItemPageRightSection
