import { useMemo } from 'react'
import { useMyMediaQuery } from '../../../hooks/useMyMediaQuery'
import { SyncroItemDto } from '../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../_common/flex/FlexCol'
import AmazonLinksSection from './AmazonLinksSection/AmazonLinksSection'
import AuthorsPaper from './AuthorsPaper/AuthorsPaper'
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

  const { isSmallScreen } = useMyMediaQuery()

  if (isSmallScreen) {
    return null
  }

  return (
    <FlexCol
      className="ItemPageRightSection"
      gap={24}
      sx={{
        alignItems: isSmallScreen ? 'center' : undefined,
        width: isSmallScreen ? '100%' : '100%',
        maxWidth: '300px',
        paddingInline: isSmallScreen ? 16 : undefined,
      }}
    >
      {hasAuthors && <AuthorsPaper item={props.item} />}

      {!isSmallScreen && (
        <>
          {props.item.type !== 'book' && <ItemNewsSection item={props.item} />}

          {props.item.type === 'book' && (
            <AmazonLinksSection item={props.item} />
          )}
        </>
      )}
    </FlexCol>
  )
}

export default ItemPageRightSection
