import { TextInput, useMantineTheme } from '@mantine/core'
import { useMemo } from 'react'
import { useSyncroItemTypeMap } from '../../../../../hooks/domains/syncro-item/useSyncroItemTypeMap'
import useCompletedCountModalStore from '../../../../../hooks/zustand/modals/useCompletedCountModalStore'
import { SyncroItemDto } from '../../../../../types/domain/syncro-item/SyncroItemDto'
import { capitalize } from '../../../../../utils/text/capitalize'
import Span from '../../../text/Span'

type Props = {
  syncroItem: SyncroItemDto
  completedDates: string[]
  onChange: (completedDates: string[]) => void
  inputWidth?: number | string
  automaticallyAddedDate: string | null
  onRemoveAutomaticallyAddedDate: () => void
}

const CompletedCountInput = ({ ...props }: Props) => {
  const typeMap = useSyncroItemTypeMap({
    itemType: props.syncroItem.type,
  })

  const theme = useMantineTheme()

  const label = useMemo(() => {
    const verb = typeMap?.getVerb()

    return (
      <Span>
        <Span>{capitalize(verb)} count</Span>

        {!!props.automaticallyAddedDate && (
          <Span title={'Added automatically'}> (+1)</Span>
        )}
      </Span>
    )
  }, [typeMap, props.automaticallyAddedDate])

  const { openModal } = useCompletedCountModalStore()

  return (
    <div className="CompletedCountInput">
      <TextInput
        w={props.inputWidth ?? '100%'}
        label={label}
        value={
          props.completedDates.length === 0 ? '' : props.completedDates.length
        }
        tabIndex={-1}
        styles={{
          input: {
            cursor: 'pointer',
          },
        }}
        onClick={() => {
          openModal({
            initialCompletedDates: props.completedDates,
            item: props.syncroItem,
            onSave: (dates) => {
              props.onChange(dates)
              if (
                props.automaticallyAddedDate &&
                !dates.includes(props.automaticallyAddedDate)
              ) {
                props.onRemoveAutomaticallyAddedDate()
              }
            },
            automaticallyAddedDate: props.automaticallyAddedDate,
          })
        }}
      />
    </div>
  )
}

export default CompletedCountInput
