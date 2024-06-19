import { Spoiler, Text, useMantineTheme } from '@mantine/core'
import { useEffect, useRef } from 'react'
import { useRatingDetailsModalStore } from '../../../../hooks/zustand/modals/useRatingDetailsModalStore'
import { RatingDto } from '../../../../types/domain/rating/RatingDto'

type Props = {
  rating: RatingDto
}

const HomeRatingItemReview = (props: Props) => {
  const { openModal: openModal } = useRatingDetailsModalStore()

  const theme = useMantineTheme()

  const controlRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      e.preventDefault()
      e.stopPropagation()
      openModal(props.rating)
    }

    if (controlRef.current) {
      controlRef.current.addEventListener('click', handleClick)
    }

    return () => {
      if (controlRef.current) {
        controlRef.current.removeEventListener('click', handleClick)
      }
    }
  }, [controlRef.current])

  return (
    <Text
      sx={{
        marginTop: 8,
        fontSize: 14,
        a: {
          textDecoration: 'none',
        },
        whiteSpace: 'pre-line',
      }}
    >
      <Spoiler
        maxHeight={66}
        hideLabel="Hide"
        showLabel="See more"
        styles={{
          control: {
            fontWeight: 600,
            color: theme.colors.dark[0],
          },
        }}
        controlRef={controlRef}
        mb={16}
      >
        {props.rating.review}
      </Spoiler>
    </Text>
  )
}

export default HomeRatingItemReview
