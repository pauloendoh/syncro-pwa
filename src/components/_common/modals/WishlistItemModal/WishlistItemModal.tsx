import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { CloseButton, Flex, Grid, Modal, Textarea, Title } from '@mantine/core'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSaveWishlistItemMutation } from '../../../../hooks/react-query/monerate/wishlist-item/useSaveWishlistItemMutation'
import { MyWishlistItemValidInput } from '../../../../types/domains/monerate/wishlist-item/MyWishlistItemValidInput'
import MyTextInput from '../../inputs/MyTextInput'
import SaveCancelButtons from '../../inputs/SaveCancelButtons'
import { WishlistItemMoreMenu } from './WishlistItemMoreMenu/WishlistItemMoreMenu'

type Props = {
  isOpen: boolean
  initialValue?: MyWishlistItemValidInput
  onClose: () => void
}

const resolver = classValidatorResolver(MyWishlistItemValidInput)

export default function WishlistItemModal(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
    watch,
    setValue,
  } = useForm<MyWishlistItemValidInput>({
    resolver,
    defaultValues: props.initialValue,
  })

  useEffect(() => {
    if (props.isOpen) {
      setTimeout(() => {
        setFocus('itemName')
        reset(props.initialValue)
      }, 100)
    }
  }, [props.isOpen])

  const { mutate: submitSave, isLoading } = useSaveWishlistItemMutation()

  const onSubmit = (data: MyWishlistItemValidInput) => {
    console.log({
      data,
    })
    submitSave(data, {
      onSuccess: () => {
        props.onClose()
      },
    })
  }

  return (
    <>
      <Modal
        opened={props.isOpen}
        onClose={() => props.onClose()}
        withCloseButton={false}
        size="md"
        styles={{
          title: {
            width: '100%',
          },
        }}
        title={
          <Flex align={'center'} justify="space-between">
            <Title order={3}>
              {props.initialValue?.id
                ? 'Edit Wishlist Item'
                : 'Add Wishlist Item'}
            </Title>
            {props.initialValue?.id ? (
              <WishlistItemMoreMenu
                item={props.initialValue}
                afterDelete={() => props.onClose()}
              />
            ) : (
              <CloseButton onClick={() => props.onClose()} />
            )}
          </Flex>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <Textarea
                autosize
                label="Item Name"
                {...register('itemName')}
                error={errors.itemName?.message}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <MyTextInput
                label="Price in Thousands"
                {...register('priceInThousands')}
                error={errors.priceInThousands?.message}
              />
            </Grid.Col>
          </Grid>

          <Flex align="center" justify="space-between" mt={16}>
            <SaveCancelButtons
              onEnabledAndCtrlEnter={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </Flex>
        </form>
      </Modal>
    </>
  )
}
