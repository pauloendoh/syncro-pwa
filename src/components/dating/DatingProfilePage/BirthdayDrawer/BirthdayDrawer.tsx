import { Drawer, Flex, Select } from '@mantine/core'
import { useEffect, useMemo, useRef, useState } from 'react'
import FlexCol from '../../../_common/flex/FlexCol'
import MyNumberInput from '../../../_common/inputs/MyNumberInput'
import SaveCancelButtons from '../../../_common/inputs/SaveCancelButtons'

type Props = {
  isOpen: boolean
  initialValue: string
  onSave: (value: string) => void
  onCancel: () => void
}

const BirthdayDrawer = ({ ...props }: Props) => {
  const initialValueDate = useMemo(() => {
    if (!props.initialValue) {
      return new Date(2000, 0, 1)
    }
    return new Date(props.initialValue)
  }, [props.initialValue])

  const [day, setDay] = useState(initialValueDate.getDate())
  const [month, setMonth] = useState(initialValueDate.getMonth())
  const [year, setYear] = useState(initialValueDate.getFullYear())

  const dayInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (props.isOpen) {
      setDay(initialValueDate.getDate())
      setMonth(initialValueDate.getMonth())
      setYear(initialValueDate.getFullYear())

      setTimeout(() => {
        dayInputRef.current?.select()
      }, 100)
    }
  }, [props.isOpen])

  const isOver18 = useMemo(() => {
    return (
      new Date(year, month, day) <
      new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    )
  }, [year, month, day])

  const isValidBirthday = useMemo(() => {
    return (
      year > 1900 &&
      year < new Date().getFullYear() &&
      month >= 0 &&
      month <= 11 &&
      day > 0 &&
      day <= 31
    )
  }, [year, month, day])

  return (
    <Drawer
      opened={props.isOpen}
      onClose={() => {
        props.onCancel()
      }}
      position="bottom"
      withCloseButton={false}
      title="Birthday"
      overlayProps={{ opacity: 0.5, blur: 4 }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()

          props.onSave(`${year}-${month + 1}-${day}`)
        }}
      >
        <FlexCol gap={40}>
          <FlexCol gap={4}>
            <Flex gap={8}>
              <MyNumberInput
                label="Day"
                value={day}
                onChange={(val) => {
                  setDay(val)
                }}
                min={1}
                max={31}
                precision={0}
                w={120}
                ref={dayInputRef}
              />

              <Select
                searchable
                label="Month"
                value={String(month)}
                onChange={(val) => {
                  if (val) {
                    setMonth(Number(val))
                  }
                }}
                data={[
                  {
                    value: '0',
                    label: 'January',
                  },
                  {
                    value: '1',
                    label: 'February',
                  },
                  {
                    value: '2',
                    label: 'March',
                  },
                  {
                    value: '3',
                    label: 'April',
                  },
                  {
                    value: '4',
                    label: 'May',
                  },
                  {
                    value: '5',
                    label: 'June',
                  },
                  {
                    value: '6',
                    label: 'July',
                  },
                  {
                    value: '7',
                    label: 'August',
                  },
                  {
                    value: '8',
                    label: 'September',
                  },
                  {
                    value: '9',
                    label: 'October',
                  },
                  {
                    value: '10',
                    label: 'November',
                  },
                  {
                    value: '11',
                    label: 'December',
                  },
                ]}
                maxDropdownHeight={500}
              />

              <MyNumberInput
                label="Year"
                value={year}
                onChange={(val) => {
                  setYear(val)
                }}
                min={1900}
                max={new Date().getFullYear()}
                precision={0}
              />
            </Flex>
            {!isOver18 && (
              <span style={{ color: 'red', fontSize: 12 }}>
                You must be over 18 years old
              </span>
            )}
            {!isValidBirthday && (
              <span style={{ color: 'red', fontSize: 12 }}>
                Please enter a valid date
              </span>
            )}
          </FlexCol>

          <SaveCancelButtons
            disabled={!isValidBirthday || !isOver18}
            onSave={() => {
              props.onSave(`${year}-${month + 1}-${day}`)
            }}
            onCancel={() => {
              props.onCancel()
            }}
          />
        </FlexCol>
      </form>
    </Drawer>
  )
}

export default BirthdayDrawer
