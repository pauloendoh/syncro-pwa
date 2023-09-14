import { Anchor, Flex, Title } from '@mantine/core'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../../_common/flex/FlexCol'
import MyPaper from '../../../_common/overrides/MyPaper'
import Span from '../../../_common/text/Span'

type Props = {
  item: SyncroItemDto
}

const AuthorsPaper = ({ ...props }: Props) => {
  return (
    <MyPaper
      sx={{
        width: '100%',
      }}
    >
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
  )
}

export default AuthorsPaper
