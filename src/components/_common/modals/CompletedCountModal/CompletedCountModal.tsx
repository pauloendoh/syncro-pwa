import { useAutoAnimate } from '@formkit/auto-animate/react'

import { ActionIcon, Center, Modal, ScrollArea, Title } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useEffect, useMemo, useState } from 'react'
import {
  MdClose,
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from 'react-icons/md'
import { useSyncroItemTypeMap } from '../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import { useMyMediaQuery } from '../../../../hooks/useMyMediaQuery'
import { useModalZIndex } from '../../../../hooks/utils/useModalZIndexState'
import useCompletedCountModalStore from '../../../../hooks/zustand/modals/useCompletedCountModalStore'
import { capitalize } from '../../../../utils/text/capitalize'
import FlexCol from '../../flex/FlexCol'
import FlexVCenter from '../../flex/FlexVCenter'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import Span from '../../text/Span'

const CompletedCountModal = () => {
  const {
    isOpen,
    closeModal,
    item,
    initialCompletedDates,
    onSave,
    automaticallyAddedDate,
  } = useCompletedCountModalStore()

  const zIndex = useModalZIndex({ isOpen })

  const typeMap = useSyncroItemTypeMap({
    itemType: item.type,
  })

  const [localDateItems, setLocalDateItems] = useState<
    {
      localId: string
      date: string
    }[]
  >([])

  useEffect(() => {
    if (isOpen) {
      setLocalDateItems(
        initialCompletedDates.map((date, index) => ({
          localId: crypto.randomUUID(),
          date,
        }))
      )
    }
  }, [isOpen])

  const title = useMemo(() => {
    const verb = typeMap?.getVerb({ isPast: true })
    return `How many times have you ${verb} "${item.title}" ?`
  }, [item, typeMap])

  const handleIncrease = () => {
    setLocalDateItems([
      ...localDateItems,
      {
        localId: crypto.randomUUID(),
        date: new Date(0).toISOString(),
      },
    ])
  }
  const handleDecrease = () => {
    const result = [...localDateItems]

    result.pop()

    setLocalDateItems(result)
  }
  const [animationParent] = useAutoAnimate()

  const { isMobile } = useMyMediaQuery()

  return (
    <Modal
      size="sm"
      opened={isOpen}
      onClose={closeModal}
      title={<Title order={4}>{title}</Title>}
      styles={{
        overlay: {
          zIndex,
        },
        inner: {
          zIndex,
        },
      }}
      scrollAreaComponent={isMobile ? undefined : ScrollArea.Autosize}
    >
      <Center w="100%" mt={16}>
        <FlexCol align="center">
          <ActionIcon onClick={handleIncrease} size="lg">
            <MdKeyboardArrowUp fontSize={24} />
          </ActionIcon>
          <Title order={2}>{localDateItems.length}</Title>
          <ActionIcon onClick={handleDecrease} size="lg">
            <MdKeyboardArrowDown fontSize={24} />
          </ActionIcon>
        </FlexCol>
      </Center>

      <FlexCol mt={16} gap={8} ref={animationParent}>
        {localDateItems.map((item, index) => {
          const value =
            new Date(item.date).toISOString() === new Date(0).toISOString()
              ? null
              : new Date(item.date)

          const label = (
            <Span>
              <Span>{`${capitalize(typeMap?.getVerb())} #${
                localDateItems.length - index
              }`}</Span>
              {item.date === automaticallyAddedDate && (
                <Span
                  size="xs"
                  sx={(theme) => ({
                    fontStyle: 'italic',
                    position: 'relative',
                    bottom: 1,
                    left: 8,
                  })}
                >
                  (Automatically added)
                </Span>
              )}
            </Span>
          )

          return (
            <FlexVCenter w="100%" key={item.localId}>
              <DateInput
                label={label}
                key={item.localId}
                value={value}
                placeholder="When did you finish it?"
                popoverProps={{
                  zIndex: zIndex + 1,
                  withinPortal: true,
                }}
                onChange={(date) => {
                  const resultItems = [...localDateItems]
                  resultItems[index] = {
                    localId: resultItems[index].localId,
                    date: date?.toISOString() ?? new Date(0).toISOString(),
                  }

                  resultItems.sort((a, b) => {
                    const dateA = a.date
                    const dateB = b.date
                    if (dateA === new Date(0).toISOString()) {
                      return 1
                    }

                    if (dateB === new Date(0).toISOString()) {
                      return -1
                    }

                    // desc
                    return new Date(dateB).getTime() - new Date(dateA).getTime()
                  })

                  setLocalDateItems(resultItems)
                }}
                w="100%"
                excludeDate={(date) => {
                  return date > new Date()
                }}
              />
              {value ? (
                <ActionIcon
                  onClick={() => {
                    const result = [...localDateItems]
                    result[index].date = new Date(0).toISOString()

                    const [cleanedItem] = result.splice(index, 1)
                    result.push(cleanedItem)

                    setLocalDateItems(result)
                  }}
                  size="lg"
                  mt={24}
                >
                  <MdClose />
                </ActionIcon>
              ) : (
                <ActionIcon
                  onClick={() => {
                    const result = [...localDateItems]
                    result.splice(index, 1)
                    setLocalDateItems(result)
                  }}
                  size="lg"
                  mt={24}
                >
                  <MdDelete />
                </ActionIcon>
              )}
            </FlexVCenter>
          )
        })}
      </FlexCol>

      <FlexCol mt={24}>
        <SaveCancelButtons
          onSave={() => {
            onSave(localDateItems.map((item) => item.date))
            closeModal()
          }}
          onCancel={closeModal}
        />
      </FlexCol>
    </Modal>
  )
}

export default CompletedCountModal
