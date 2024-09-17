import { Box, Container, Textarea } from '@mantine/core'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import useUpdateProfileMutation from '../../hooks/react-query/profile/useUpdateProfileMutation'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyMediaQuery } from '../../hooks/useMyMediaQuery'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { ProfilePutDto } from '../../types/domain/profile/ProfilePutDto'
import { urls } from '../../utils/urls/urls'
import FlexCol from '../_common/flex/FlexCol'
import MyTextInput from '../_common/inputs/MyTextInput'
import SaveCancelButtons from '../_common/inputs/SaveCancelButtons'
import DefaultLayout from '../_common/layout/DefaultLayout'
import MyPaper from '../_common/overrides/MyPaper'
import ChangeProfileImageSection from './ChangeProfileImageSection/ChangeProfileImageSection'
import EditLookingForRecommendations from './EditLookingForRecommendations/EditLookingForRecommendations'

type Props = {}

const EditProfilePage = (props: Props) => {
  const authUser = useAuthStore((s) => s.authUser)

  const { data } = useUserInfoQuery(authUser?.id)

  const { control, handleSubmit, watch, setValue } = useForm<ProfilePutDto>({
    defaultValues: {
      bio: data?.profile.bio,

      name: data?.profile.fullName,
      username: authUser?.username,
      website: data?.profile.websiteUrl,
      lookingForRecommendationTypes:
        data?.profile.lookingForRecommendationTypes,
    },
  })

  const { mutate: submitUpdateProfile, isLoading } = useUpdateProfileMutation()

  const router = useRouter()

  const { isMobile } = useMyMediaQuery()

  if (!authUser) return null

  return (
    <DefaultLayout>
      <Container size="xs">
        <MyPaper
          px={isMobile ? 8 : undefined}
          mt={isMobile ? 0 : undefined}
          w={isMobile ? '100%' : undefined}
          bg={isMobile ? 'transparent' : undefined}
        >
          <form
            onSubmit={handleSubmit((data) => {
              submitUpdateProfile(data, {
                onSuccess: () => {
                  router.push(urls.pages.userProfile(authUser!.id))
                },
              })
            })}
          >
            <Box
              onClick={() => {
                //openImagePickerAsync('gallery')
              }}
            >
              <FlexCol align="center" gap={8}>
                {authUser && <ChangeProfileImageSection userId={authUser.id} />}
              </FlexCol>
            </Box>

            <FlexCol gap={16}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    label="Name"
                  />
                )}
                name="name"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    label="Username"
                  />
                )}
                name="username"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Textarea
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    label="Bio"
                    autosize
                    minRows={3}
                  />
                )}
                name="bio"
              />

              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <MyTextInput
                    onBlur={onBlur}
                    onChange={(e) => onChange(e.target.value)}
                    value={value}
                    label="Website"
                  />
                )}
                name="website"
              />

              <EditLookingForRecommendations
                selectedTypes={watch('lookingForRecommendationTypes')}
                onChange={(types) => {
                  setValue('lookingForRecommendationTypes', types)
                }}
              />
            </FlexCol>

            <Box mt={24}>
              <SaveCancelButtons
                isLoading={isLoading}
                onCancel={() => {
                  router.push(urls.pages.userProfile(authUser!.id))
                }}
              />
            </Box>
          </form>
        </MyPaper>
      </Container>
    </DefaultLayout>
  )
}

export default EditProfilePage
