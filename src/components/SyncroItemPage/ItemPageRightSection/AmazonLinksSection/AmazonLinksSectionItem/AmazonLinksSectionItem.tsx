import { Flex } from '@mantine/core'
import { shortNumberFormatter } from 'endoh-utils'
import { useMemo } from 'react'
import { MdStar } from 'react-icons/md'
import { AmazonLinkDto } from '../../../../../hooks/react-query/syncro-item/book/types/AmazonLinkDto'
import { useMyColors } from '../../../../../hooks/useMyColors'
import FlexCol from '../../../../_common/flex/FlexCol'
import FlexVCenter from '../../../../_common/flex/FlexVCenter'
import Span from '../../../../_common/text/Span'

type Props = {
  link: AmazonLinkDto
}

const AmazonLinksSectionItem = ({ link, ...props }: Props) => {
  const { ratingYellow } = useMyColors()

  // eg: https://www.amazon.com.br... -> amazon.com.br
  const domain = link.amazonUrl.split('/')[2]
  const domainWithoutWww = useMemo(() => {
    const parts = domain.split('.')
    if (parts[0] === 'www') {
      return parts.slice(1).join('.')
    }
    return domain
  }, [domain])

  return (
    <Flex key={link.amazonUrl} gap={8}>
      <LocalLink url={link.amazonUrl}>
        <div
          style={{
            position: 'relative',
          }}
        >
          <img
            src={link.image}
            style={{
              width: 100,
              borderRadius: 4,
            }}
          />
          {domainWithoutWww !== 'amazon.com' && (
            <Span
              size="xs"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: '2px 4px',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
              }}
            >
              {domainWithoutWww}
            </Span>
          )}
        </div>
      </LocalLink>

      <FlexCol>
        <LocalLink url={link.amazonUrl}>
          <Span lineClamp={5}>{link.title}</Span>
        </LocalLink>
        <div>
          <Span size="sm" color="dimmed">
            by {link.author}
          </Span>
        </div>
        <FlexVCenter mt={4}>
          <MdStar
            style={{
              color: ratingYellow,
              fontSize: 18,
            }}
          />
          <Span ml={4} size="sm">
            <span>
              {link.rating} ({shortNumberFormatter(link.ratingsCount)})
            </span>
          </Span>
        </FlexVCenter>
      </FlexCol>
    </Flex>
  )
}

const LocalLink = (props: { children: React.ReactNode; url: string }) => {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      {props.children}
    </a>
  )
}

export default AmazonLinksSectionItem
