import { Title } from '@mantine/core'
import { useAmazonLinksQuery } from '../../../../hooks/react-query/syncro-item/book/useAmazonLinksQuery'
import { SyncroItemDto } from '../../../../types/domain/syncro-item/SyncroItemDto'
import FlexCol from '../../../_common/flex/FlexCol'
import CenterLoader from '../../../_common/overrides/CenterLoader/CenterLoader'
import MyPaper from '../../../_common/overrides/MyPaper'
import { Text } from '../../../_common/text/Text'
import AmazonLinksSectionItem from './AmazonLinksSectionItem/AmazonLinksSectionItem'

type Props = {
  item: SyncroItemDto
}

const AmazonLinksSection = ({ ...props }: Props) => {
  const { data, isLoading } = useAmazonLinksQuery(props.item.id)
  return (
    <MyPaper className="AmazonLinksSection">
      <Title order={4}>Amazon links</Title>
      {isLoading && <CenterLoader />}
      {!isLoading && data?.length === 0 && <Text mt={24}>No links found</Text>}
      <FlexCol mt={8} gap={16}>
        {data?.map((link) => (
          <AmazonLinksSectionItem link={link} key={link.amazonUrl} />
        ))}
      </FlexCol>
    </MyPaper>
  )
}

export default AmazonLinksSection
