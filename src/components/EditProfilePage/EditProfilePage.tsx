import { Box, Container, Textarea, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import useUpdateProfileMutation from '../../hooks/react-query/profile/useUpdateProfileMutation'
import { useUserInfoQuery } from '../../hooks/react-query/user/useUserInfoQuery'
import { useMyColors } from '../../hooks/useMyColors'
import useAuthStore from '../../hooks/zustand/useAuthStore'
import { ProfilePutDto } from '../../types/domain/profile/ProfilePutDto'
import { urls } from '../../utils/urls'
import FlexCol from '../_common/flex/FlexCol'
import MyTextInput from '../_common/inputs/MyTextInput'
import SaveCancelButtons from '../_common/inputs/SaveCancelButtons'
import LoggedLayout from '../_common/layout/LoggedLayout'
import MyPaper from '../_common/overrides/MyPaper'
import ProfileImageProfileScreen from './ProfileImageProfileScreen/ProfileImageProfileScreen'

type Props = {}

const EditProfilePage = (props: Props) => {
  const { lightBackground } = useMyColors()
  const authUser = useAuthStore((s) => s.authUser)

  // const openImagePickerAsync = usePickProfileImage(authUser!.id)

  const { data } = useUserInfoQuery(authUser?.id)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfilePutDto>({
    defaultValues: {
      bio: data?.profile.bio,

      name: data?.profile.fullName,
      username: authUser?.username,
      website: data?.profile.websiteUrl,
    },
  })

  const { mutate: submitUpdateProfile, isLoading } = useUpdateProfileMutation()

  const theme = useMantineTheme()

  const router = useRouter()

  if (!authUser) return null

  return (
    <LoggedLayout>
      <Container size="xs">
        <MyPaper>
          <form
            onSubmit={handleSubmit((data) => {
              submitUpdateProfile(data, {
                onSuccess: () => {
                  router.push(urls.pages.user(authUser!.id))
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
                {authUser && <ProfileImageProfileScreen userId={authUser.id} />}
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
            </FlexCol>

            <Box mt={24}>
              <SaveCancelButtons
                isLoading={isLoading}
                onCancel={() => {
                  router.push(urls.pages.user(authUser!.id))
                }}
              />
            </Box>
          </form>
        </MyPaper>
      </Container>
    </LoggedLayout>
  )
}

export default EditProfilePage
